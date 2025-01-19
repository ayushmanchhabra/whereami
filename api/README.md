# api

Server for `whereami`.

## Getting Started

1. Hopefully be running a Linux machine.
1. Install [`make`](https://www.gnu.org/software/make/)
1. Install [Go](https://go.dev/) 1.23.4
1. `make debug` to compile debug build
1. `make release` to compile release build
1. `make test` to run tests

## Roadmap

- [ ] Deploy to cloud server.
- [ ] Add code coveragen in PRs.

## Documentation

### `/api/v1/user/signin`

HTTP Method: `POST`

Content Type: `json`

Parameters:

| Name | Type |
| -----|------|
| username|`string`|
| password|`string`|

### `/api/v1/user/signout`

HTTP Method: `POST`

Content Type: `json`

Parameters:

| Name | Type |
| -----|------|
| |``|
