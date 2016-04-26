package com.github.sedovalx.oauth2.utils.logging;

/**
 * Маркер логгирования
 */
@Retention(AnnotationRetention.RUNTIME)
@Target(AnnotationTarget.FUNCTION)
annotation class  Loggable (
    val message: String = "",
    val printExceptionStackTrace: Boolean = true
)
