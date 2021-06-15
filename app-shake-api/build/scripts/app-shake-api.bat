@rem
@rem Copyright 2015 the original author or authors.
@rem
@rem Licensed under the Apache License, Version 2.0 (the "License");
@rem you may not use this file except in compliance with the License.
@rem You may obtain a copy of the License at
@rem
@rem      https://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.
@rem

@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  app-shake-api startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@rem Add default JVM options here. You can also use JAVA_OPTS and APP_SHAKE_API_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto execute

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\app-shake-api-0.0.1-SNAPSHOT.jar;%APP_HOME%\lib\ktor-serialization-jvm-1.5.4.jar;%APP_HOME%\lib\ktor-server-cio-jvm-1.5.4.jar;%APP_HOME%\lib\ktor-server-host-common-jvm-1.5.4.jar;%APP_HOME%\lib\ktor-server-core-jvm-1.5.4.jar;%APP_HOME%\lib\kotlin-stdlib-jdk8-1.4.32.jar;%APP_HOME%\lib\logback-classic-1.2.1.jar;%APP_HOME%\lib\web-push-5.1.1.jar;%APP_HOME%\lib\bcprov-jdk15on-1.69.jar;%APP_HOME%\lib\ktor-http-cio-jvm-1.5.4.jar;%APP_HOME%\lib\ktor-network-jvm-1.5.4.jar;%APP_HOME%\lib\ktor-http-jvm-1.5.4.jar;%APP_HOME%\lib\ktor-utils-jvm-1.5.4.jar;%APP_HOME%\lib\kotlin-stdlib-jdk7-1.4.32.jar;%APP_HOME%\lib\kotlin-reflect-1.4.32.jar;%APP_HOME%\lib\kotlinx-serialization-json-jvm-1.1.0.jar;%APP_HOME%\lib\kotlinx-coroutines-jdk8-1.4.3-native-mt.jar;%APP_HOME%\lib\ktor-io-jvm-1.5.4.jar;%APP_HOME%\lib\kotlinx-coroutines-core-jvm-1.4.3-native-mt.jar;%APP_HOME%\lib\kotlinx-serialization-core-jvm-1.1.0.jar;%APP_HOME%\lib\kotlin-stdlib-1.4.32.jar;%APP_HOME%\lib\async-http-client-2.10.4.jar;%APP_HOME%\lib\jose4j-0.7.0.jar;%APP_HOME%\lib\async-http-client-netty-utils-2.10.4.jar;%APP_HOME%\lib\slf4j-api-1.7.30.jar;%APP_HOME%\lib\logback-core-1.2.1.jar;%APP_HOME%\lib\config-1.3.1.jar;%APP_HOME%\lib\jcommander-1.78.jar;%APP_HOME%\lib\httpasyncclient-4.1.4.jar;%APP_HOME%\lib\kotlin-stdlib-common-1.4.32.jar;%APP_HOME%\lib\annotations-13.0.jar;%APP_HOME%\lib\httpcore-nio-4.4.10.jar;%APP_HOME%\lib\httpclient-4.5.6.jar;%APP_HOME%\lib\httpcore-4.4.10.jar;%APP_HOME%\lib\commons-logging-1.2.jar;%APP_HOME%\lib\netty-handler-proxy-4.1.42.Final.jar;%APP_HOME%\lib\netty-codec-http-4.1.42.Final.jar;%APP_HOME%\lib\netty-reactive-streams-2.0.3.jar;%APP_HOME%\lib\netty-handler-4.1.42.Final.jar;%APP_HOME%\lib\netty-codec-socks-4.1.42.Final.jar;%APP_HOME%\lib\netty-transport-native-epoll-4.1.42.Final-linux-x86_64.jar;%APP_HOME%\lib\netty-transport-native-kqueue-4.1.42.Final-osx-x86_64.jar;%APP_HOME%\lib\netty-resolver-dns-4.1.42.Final.jar;%APP_HOME%\lib\reactive-streams-1.0.2.jar;%APP_HOME%\lib\javax.activation-1.2.0.jar;%APP_HOME%\lib\commons-codec-1.10.jar;%APP_HOME%\lib\netty-codec-dns-4.1.42.Final.jar;%APP_HOME%\lib\netty-codec-4.1.42.Final.jar;%APP_HOME%\lib\netty-transport-native-unix-common-4.1.42.Final.jar;%APP_HOME%\lib\netty-transport-4.1.42.Final.jar;%APP_HOME%\lib\netty-buffer-4.1.42.Final.jar;%APP_HOME%\lib\netty-resolver-4.1.42.Final.jar;%APP_HOME%\lib\netty-common-4.1.42.Final.jar


@rem Execute app-shake-api
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %APP_SHAKE_API_OPTS%  -classpath "%CLASSPATH%" io.ktor.server.cio.EngineMain %*

:end
@rem End local scope for the variables with windows NT shell
if "%ERRORLEVEL%"=="0" goto mainEnd

:fail
rem Set variable APP_SHAKE_API_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
if  not "" == "%APP_SHAKE_API_EXIT_CONSOLE%" exit 1
exit /b 1

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
