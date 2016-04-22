package com.github.sedovalx.oauth2.controllers

import org.springframework.beans.factory.annotation.Value

/**
 * Created by Alexander
 * on 22.04.2016.
 */
abstract class ControllerBase {
    @Value("\${app.web.debug.timeouts:0}")
    protected var imitateTimeouts: Long = 0

    protected fun imitateTimeouts(){
        if (imitateTimeouts != 0L){
            Thread.sleep(imitateTimeouts)
        }
    }
}