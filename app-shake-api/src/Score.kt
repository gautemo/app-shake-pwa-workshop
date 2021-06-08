package gautemo

import kotlinx.serialization.Serializable

@Serializable
data class Score(val name: String, var points: Int)
