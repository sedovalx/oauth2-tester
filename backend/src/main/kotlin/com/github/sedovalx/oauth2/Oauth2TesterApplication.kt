package com.github.sedovalx.oauth2

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class Oauth2TesterApplication

fun main(args: Array<String>) {
    SpringApplication.run(Oauth2TesterApplication::class.java, *args)
}
