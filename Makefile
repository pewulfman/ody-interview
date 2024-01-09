.Phony: install-dependencies setup-db clean-docker-volume deep-clean clean

install-dependencies:
	yarn

setup-db:
	yarn postgre:up
	yarn migration:run
	yarn postgre:down

clean-docker-volume:
	docker volume rm docker_psql

clean:
	rm -rf dist

deep-clean: clean-docker-volume clean
	rm -rf node_modules

