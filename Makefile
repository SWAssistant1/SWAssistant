.PHONY: install lint build build-win run clean dist

install:
	npm install

lint:
	npm run lint

build:
	npm run build

build-win:
	npm run build:win

run: build
	rm -rf dist/squashfs-root
	cd dist && ./SWAssistant-1.0.0.AppImage --appimage-extract
	env -u ELECTRON_RUN_AS_NODE xvfb-run -a ./dist/squashfs-root/AppRun --no-sandbox

clean:
	rm -rf dist node_modules
