package gautemo

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*
import io.ktor.features.*
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.serialization.*

fun main(args: Array<String>): Unit = io.ktor.server.cio.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
    install(CORS) {
        anyHost()
        allowNonSimpleContentTypes = true
    }
    install(ContentNegotiation) {
        json()
    }

    val leaderboard = mutableListOf<Score>()

    routing {
        get("/") {
            call.respondText("HELLO WORLD!", contentType = ContentType.Text.Plain)
        }
        get("/scores"){
            call.respond(leaderboard)
        }
        post("/scores"){
            val score = call.receive<Score>()
            val playerAlready = leaderboard.find { it.name == score.name }
            if(playerAlready != null){
                playerAlready.points = maxOf(playerAlready.points, score.points)
            }else{
                leaderboard.add(score)
            }
            leaderboard.sortByDescending { it.points }
            if(leaderboard.size > 3) leaderboard.removeLast()
            call.respond(200)
        }
    }
}