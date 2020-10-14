FROM nginx 

LABEL maintainer="tecnico@qualityobjects.com" \
      vendor="Quality Objects" \
      description="h3lp3r front"

RUN apt update && apt install -y procps && apt clean
ENV TZ="Europe/Madrid"
ARG GENERATED_FRONT_FILE="h3lp3r-front.tgz"

COPY ./etc/docker/default.conf /etc/nginx/conf.d/default.conf

WORKDIR "/usr/share/nginx/html"
COPY ${GENERATED_FRONT_FILE} .

RUN tar xvfz ${GENERATED_FRONT_FILE} && rm -f ${GENERATED_FRONT_FILE} && ls -la

