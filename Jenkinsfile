def gitCredentialsId = 'GitLab-qualityobjects'
def dockerCredentialsId = 'docker-registry.qodev.es'
def npmrcCredentialsId = '.npmrc'

def createBuildInfoFile(targetDir) {
    sh "[ -d ${targetDir} ] &&  echo ${targetDir} already exists || mkdir -p ${targetDir}"
    sh "git log --no-decorate --date=iso | head -4 > ${targetDir}/build_info.txt"
}

def getCurrentCommit(projectDir) {
    dir(projectDir) {
        return sh(script: "git log --no-decorate | head -1 | cut -f2 -d' '", returnStdout: true).trim()
    }
}

pipeline {
    agent { label 'jenkins-agent-1' }
    environment {
        NEXUS_IP = sh(script: "getent hosts nexus.qodev.es | cut -f1 -d ' ' ", returnStdout: true).trim()
        PROJECT_NAME = sh(script: 'echo $REPO_URL | awk -F / \'{print $NF}\' | cut -f1 -d"."', returnStdout: true).trim()
        DOCKER_IMAGE_URL = "h3lp3r/${PROJECT_NAME}"
    }
    parameters {
        string(name: 'REPO_URL', defaultValue: 'git@gitlab.com:qo-oss/h3lp3r/h3lp3r-front.git', description: 'URL del repositorio')
        string(name: 'BUILD_BRANCH', defaultValue: 'dev', description: 'Rama a construir')
        booleanParam(name: 'BUILD_FRONT', defaultValue: true, description: 'Construye el front')
        choice(name: 'FRONT_TESTS', choices: ['only_unit', 'unit_and_sonar', 'unit_and_sonar_strict_tests', 'no_tests'], description: 'Tests a ejecutar')
        choice(name: 'DEPLOY_NAMESPACE', choices: ['h3lp3r'], description: 'Namespace a desplegar')
    }
    stages {
        stage('Clean WS') {
            steps {
                script {
                    sh '[ $(ls -1 *.tgz 2>/dev/null | wc -l) -gt 0 ] && rm -f *.tgz || exit 0'
                    sh '[ $(ls -1 *.jar 2>/dev/null | wc -l) -gt 0 ] && rm -f *.jar || exit 0'
                    sh '[ ! -d .cache ] && mkdir .cache || echo .cache exists'
                }
            }
        }

        stage('Clone Git project') {
            when {
                environment name: 'BUILD_FRONT', value: 'true'
            }
            steps {
                script {
                    try {
                        sh 'mkdir ${PROJECT_NAME}'
                    } catch (err) {
                        dir("${PROJECT_NAME}") {
                            sh 'ls -1A | grep -v .npm | grep -v node_modules | xargs rm -rf || echo Empty dir'
                            sh '[ -d node_modules ] && mv node_modules ../.cache/ || echo No node_modules dir'
                            sh '[ -d .npm ] && mv .npm ../.cache/ || echo No .mpn dir'
                        }
                    }
                }

                dir("${PROJECT_NAME}") {
                    git url: "${REPO_URL}",
                            branch: "${BUILD_BRANCH}",
                            credentialsId: gitCredentialsId

                    createBuildInfoFile('src/assets')
                }
                script {
                    dir('.cache') {
                        sh '[ -d node_modules ] && mv node_modules ../${PROJECT_NAME}/ || echo No node_modules cached'
                        sh '[ -d .npm ] && mv .npm ../${PROJECT_NAME}/ || echo No .npm cached'
                    }
                }
            }
        }
/////////////////////////////////////
/*
        stage('Test') {
            stages {
                stage('Unit tests') {
                    when {
                        expression {
                            return env.FRONT_TESTS != 'no_tests';
                        }
                    }
                    steps {
                        dir("${PROJECT_NAME}") {
                            sh 'mvn verify'
                        }
                    }
                }
                stage('Sonar tests') {
                    when {
                        anyOf {
                            environment name: 'FRONT_TESTS', value: 'unit_and_sonar'
                            environment name: 'FRONT_TESTS', value: 'unit_and_sonar_strict_tests'
                        }
                    }
                    steps {
                        dir("${PROJECT_NAME}") {
                            withSonarQubeEnv(installationName: 'QO Sonar') {
                                sh 'mvn verify sonar:sonar -DskipTests=true'
                            }
                        }
                    }
                }
                stage('Quality Gate') {
                    when {
                        environment name: 'FRONT_TESTS', value: 'unit_and_sonar_strict_tests'
                    }
                    steps {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }
*/
/////////////////////////////////////
        stage('Build') {
            when {
                environment name: 'BUILD_FRONT', value: 'true'
            }
            environment {
                HOME = "."
                APP_VERSION = sh(script: 'node -p "require(\\"./${PROJECT_NAME}/package.json\\").version"', returnStdout: true).trim()
            }
            stages {
                stage('Build front') {
                    agent {
                        docker {
                            image 'node:12-slim'
                            args '--add-host nexus.qodev.es:${NEXUS_IP}'
                            reuseNode true
                        }
                    }
                    steps {
                        dir("${PROJECT_NAME}") {
                            withCredentials([file(credentialsId: npmrcCredentialsId, variable: 'NPMRC')]) {
                                sh 'cp "$NPMRC" ./.npmrc'
                            }
                            sh 'echo "Version: ${APP_VERSION}" >> src/assets/build_info.txt'
                            sh 'cat src/assets/build_info.txt'
                            //sh 'rm package-lock.json'
                            sh 'echo n | npm i --no-color'
                            sh 'npx ng build --prod'
                            dir("dist/${PROJECT_NAME}") {
                                sh 'tar cvfz \"${WORKSPACE}/${PROJECT_NAME}.tgz\" .'
                            }

                        }
                        stash includes: "${PROJECT_NAME}.tgz", name: "${PROJECT_NAME}-files"
                    }
                }
                stage('Docker image build') {
                    steps {
                        dir("${PROJECT_NAME}") {
                            unstash "${PROJECT_NAME}-files"
                            script {
                                def commit = getCurrentCommit("${PROJECT_NAME}")
                                def buildArgs = "--label \"branch=${BUILD_BRANCH}\" --label \"version=${APP_VERSION}\" --label \"commit=${commit}\" --label \"maintainer=Jarvis team <jarvis_team@qualityobjects.com>\" ."
                                def appImage = docker.build("${DOCKER_IMAGE_URL}:latest", buildArgs)
                                docker.withRegistry('https://docker-registry.qodev.es', dockerCredentialsId) {
                                    appImage.push('${APP_VERSION}')
                                    appImage.push("latest")
                                    appImage.push("release")
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
