
OPENAPI_DIR = server/api/openapi
OUTPUT_DIR = client/shared/interfaces

JSONS := $(wildcard $(OPENAPI_DIR)/*.json)
TS_OUTPUTS := $(patsubst $(OPENAPI_DIR)/%.json,$(OUTPUT_DIR)/%.ts,$(JSONS))

# Default target: generate all
gen-types: clean-types $(TS_OUTPUTS)

# Rule: convert one .json → one .ts
$(OUTPUT_DIR)/%.ts: $(OPENAPI_DIR)/%.json
	@echo "Generating types for $< → $@"
	# @pnpm dlx @aopture/openapi-down-convert --input $< --output $@
	@pnpm dlx -y openapi-typescript $< -o $@

# Clean generated files
clean-types:
	@rm -f $(OUTPUT_DIR)/*.ts

.PHONY: gen-types clean-types
