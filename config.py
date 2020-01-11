import yaml

config = yaml.safe_load(open('config.yaml'))

IS_DEV=config['tool']['is-dev']
REDIS_HOST=config['redis']['host-dev'] if IS_DEV else config['redis']['host-toollabs']