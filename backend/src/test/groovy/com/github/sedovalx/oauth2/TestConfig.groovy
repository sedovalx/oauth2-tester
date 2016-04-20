package com.github.sedovalx.oauth2

import com.github.sedovalx.oauth2.mock.OAuthServerRepoMock
import com.github.sedovalx.oauth2.storage.repos.OAuthServerRepo
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.context.annotation.Primary
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter

/**
 * Author AlSedov on 20.04.2016
 */
@Configuration
@EnableAutoConfiguration
@Import([Oauth2TesterApplication])
class TestConfig extends WebMvcConfigurerAdapter {
    @Primary
    @Bean
    OAuthServerRepo oAuthServerRepo() {
        return new OAuthServerRepoMock()
    }
}
