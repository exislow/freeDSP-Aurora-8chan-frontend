app_path_dist = "dist"

.PHONY: build-post
build-post: ## Some renaming & replacing work.
	@sed -i "" "s/aurora.js/aurora.jgz/g" $(app_path_dist)/index.html
	@sed -i "" "s/url(\/fa-solid-900.ttf) format(\"truetype\")//g" $(app_path_dist)/dark.css
	@mv $(app_path_dist)/index.html $(app_path_dist)/dsp.html
	@rm $(app_path_dist)/*.ttf
