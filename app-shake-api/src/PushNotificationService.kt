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

class PushNotificationService(publicKey: String, privateKey: String) {
    private val subscriptions = mutableListOf<Subscription>()
    private val pushService = PushService()
    init {
        Security.addProvider(BouncyCastleProvider())
        pushService.publicKey = Utils.loadPublicKey(publicKey)
        pushService.privateKey = Utils.loadPrivateKey(privateKey)
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