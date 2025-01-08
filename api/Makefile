.PHONY: debug release test

debug:
	go build -o api_debug.exe

release:
	go build -ldflags "-s -w" -o api_release.exe

test:
	go test
