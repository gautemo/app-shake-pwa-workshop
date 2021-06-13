package gautemo

import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.serialization.*
import kotlinx.serialization.json.Json
import nl.martijndwars.webpush.*

fun main(args: Array<String>): Unit = io.ktor.server.cio.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
    install(CORS) {
        anyHost()
        allowNonSimpleContentTypes = true
    }
    install(ContentNegotiation) {
        json(Json {
            ignoreUnknownKeys = true
        })
    }

    val pushNotiicationService = PushNotificationService(
        environment.config.property("ktor.pushService.publicKey").getString(),
        environment.config.property("ktor.pushService.privateKey").getString()
    )
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
            val place = leaderboard.count { it.points > score.points } + 1
            val playerAlready = leaderboard.find { it.name == score.name }
            if(place <= 3 && (playerAlready == null || playerAlready.points < score.points)){
                if(playerAlready != null){
                    playerAlready.points = maxOf(playerAlready.points, score.points)
                }else{
                    leaderboard.add(score)
                }
                leaderboard.sortByDescending { it.points }
                if(leaderboard.size > 3) leaderboard.removeLast()
                pushNotiicationService.sendNotification(Message(place, score))
            }
            call.respond(HttpStatusCode.OK)
        }
        get("/scores/reset"){
            leaderboard.clear()
            call.respond(HttpStatusCode.OK)
        }
        post("/subscribe"){
            val subData = call.receive<SubscriptionData>()
            val subscription = Subscription(subData.endpoint, Subscription.Keys(subData.keys.p256dh, subData.keys.auth))
            pushNotiicationService.addSubscription(subscription)
            call.respond(HttpStatusCode.OK)
        }
    }
}