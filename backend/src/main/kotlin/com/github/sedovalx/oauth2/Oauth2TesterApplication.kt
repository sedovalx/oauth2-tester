package com.github.sedovalx.oauth2

import com.github.sedovalx.oauth2.utils.web.HttpRequestLoggingInterceptor
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter

@Configuration
@EnableAutoConfiguration
@ComponentScan(basePackages = arrayOf(
        "com.github.sedovalx.oauth2.controllers"
))
open class Oauth2TesterApplication: WebMvcConfigurerAdapter() {
    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(HttpRequestLoggingInterceptor())
        super.addInterceptors(registry)
    }
}

fun main(args: Array<String>) {
    SpringApplication.run(Oauth2TesterApplication::class.java, *args)
}
