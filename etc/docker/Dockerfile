FROM ubuntu:18.04 as builder

LABEL maintainer="tecnico@qualityobjects.com" \
      vendor="Quality Objects" \
      description="h3lp3r Vacation Builder"

#Instalamos el repo de node 10.x
RUN apt update -y && apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -

RUN apt install -y nodejs && apt clean
RUN npm install -g @angular/cli

ENV WORKSPACE=/opt/workspace
#Cómo generar sources: tar -cvz -f h3lp3r-front-sources.tgz --exclude="node_modules" --exclude="dist" --exclude=".git" h3lp3r-front/
ARG front_project_sources=h3lp3r-front-sources.tgz
ENV GENERATED_FRONT_FILE="h3lp3r-front.tgz"
RUN mkdir $WORKSPACE
WORKDIR "$WORKSPACE"

ADD $front_project_sources $WORKSPACE

RUN cd $WORKSPACE; ls -l
RUN ng config -g cli.warnings.versionMismatch false
RUN cd h3lp3r-front && npm i --no-color && node --max-old-space-size=9000 /usr/bin/ng build --prod && rm -rf node_modules
RUN cd h3lp3r-front/dist/h3lp3r-front && tar cvfz "${WORKSPACE}/${GENERATED_FRONT_FILE}" *
RUN mv "${WORKSPACE}/${GENERATED_FRONT_FILE}" /${GENERATED_FRONT_FILE}

FROM nginx as executor

RUN apt update && apt install -y procps && apt clean
ENV TZ="Europe/Madrid"
ENV GENERATED_FRONT_FILE="h3lp3r-front.tgz"

COPY default.conf /etc/nginx/conf.d/default.conf

WORKDIR "/usr/share/nginx/html"
COPY --from=builder ${GENERATED_FRONT_FILE} .

RUN tar xvfz ${GENERATED_FRONT_FILE} && rm -f ${GENERATED_FRONT_FILE} && ls -la

