package com.github.sedovalx.oauth2

import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter

/**
 * Author AlSedov on 20.04.2016
 */
@Configuration
@EnableAutoConfiguration
@Import([Oauth2TesterApplication])
class TestConfig extends WebMvcConfigurerAdapter {

}
