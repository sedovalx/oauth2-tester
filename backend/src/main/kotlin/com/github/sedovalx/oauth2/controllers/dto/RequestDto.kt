package com.github.sedovalx.oauth2.controllers.dto

/**
 * Created by Alexander
 * on 26.04.2016.
 */

class KeyValue {
    var key: String = ""
    var value: String = ""
}

class RequestDto {
    var uri: String = ""
    var body: String? = null
    var headers: List<KeyValue>? = null
}