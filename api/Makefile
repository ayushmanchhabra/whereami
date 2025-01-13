.PHONY: debug release test

dev:
	air

debug:
	go build -o api_debug.exe

release:
	go build -ldflags "-s -w" -o api_release.exe

test:
	go test
