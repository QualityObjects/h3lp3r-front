FROM node:slim as builder

LABEL maintainer="tecnico@qualityobjects.com" \
      vendor="Quality Objects" \
      description="h3lp3r front Builder"

RUN npm install -g @angular/cli

ENV WORKSPACE=/opt/workspace
ENV GENERATED_FRONT_FILE="h3lp3r-front.tgz"
RUN mkdir $WORKSPACE
WORKDIR "$WORKSPACE"

ADD ./ $WORKSPACE/src/

RUN cd $WORKSPACE/src && ls -l1 && npm i --no-color && npx ng build --prod
RUN cd src/dist/h3lp3r-front && tar cvfz "/${GENERATED_FRONT_FILE}" *

FROM nginx as executor

RUN apt update && apt install -y procps && apt clean
ENV TZ="Europe/Madrid"
ENV GENERATED_FRONT_FILE="h3lp3r-front.tgz"

COPY --from=builder /opt/workspace/src/etc/docker/default.conf /etc/nginx/conf.d/default.conf

WORKDIR "/usr/share/nginx/html"
COPY --from=builder ${GENERATED_FRONT_FILE} .

RUN tar xvfz ${GENERATED_FRONT_FILE} && rm -f ${GENERATED_FRONT_FILE} && ls -la

