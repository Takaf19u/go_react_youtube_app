FROM golang:1.16.7
WORKDIR /go/src
ENV GO111MODULE=on
# ローカルのファイルをdockerの./にコピー
COPY ./go/go.mod ./go/go.sum ./
RUN go mod download
EXPOSE 8080
CMD ["go", "run", "./main.go"]