rem prepare tgz

rem tar -cvz -f h3lp3r-front.tgz --exclude="*/node_modules" --exclude="*/dist" --exclude="*/.git" hemera-front/

docker build --tag=h3lp3r-front:latest --tag=qualityobjects/h3lp3r-front:latest .
rem docker run --rm -it -p1080:80 h3lp3r-front
