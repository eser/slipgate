FROM denoland/deno:ubuntu-2.1.4

# The port that the application listens to.
EXPOSE 8080

# Prefer not to run as root.
USER deno

# set DENO_DIR to avoid conflicts with google cloud
ENV DENO_DIR=./.deno_cache

WORKDIR /app
COPY . .

RUN deno install --entrypoint main.ts
RUN deno cache main.ts

EXPOSE 3000

CMD ["deno", "serve", "--allow-net", "--allow-env", "--port", "3000", "main.ts"] 
