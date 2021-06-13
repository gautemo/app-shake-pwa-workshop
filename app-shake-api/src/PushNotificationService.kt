package gautemo

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import nl.martijndwars.webpush.Notification
import nl.martijndwars.webpush.PushService
import nl.martijndwars.webpush.Subscription
import nl.martijndwars.webpush.Utils
import org.bouncycastle.jce.provider.BouncyCastleProvider
import java.security.Security

class PushNotificationService {
    private val subscriptions = mutableListOf<Subscription>()
    private val pushService = PushService()
    init {
        Security.addProvider(BouncyCastleProvider())
        pushService.publicKey = Utils.loadPublicKey("BEzSlAoTTZ8jY41D4IS26iNN6gnJ6Cc6DTnkaEh3b-JGS6MrxSvRWp5NGuY_hy8Yd9N4-i_TgxCqxlGk9Sgvquk")
        pushService.privateKey = Utils.loadPrivateKey("5IS3p1nDq95sbkvRQHwrpELpA45C3g1zPEIAybCYrPo")
    }

    fun addSubscription(subscription: Subscription) = subscriptions.add(subscription)

    fun sendNotification(message: Message){
        for(sub in subscriptions){
            val notification = Notification(sub, Json.encodeToString(message))
            pushService.send(notification)
        }
    }
}

@Serializable
data class Keys(val p256dh: String, val auth: String)
@Serializable
data class SubscriptionData(val endpoint: String, val keys: Keys)
@Serializable
data class Message(val place: Int, val score: Score)