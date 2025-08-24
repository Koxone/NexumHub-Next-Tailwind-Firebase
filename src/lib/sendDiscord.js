// src/lib/sendDiscord.js
export const sendDiscord = async (content) => {
  try {
    const res = await fetch(
      "https://discord.com/api/webhooks/1409027152892002425/V8-yBR7VMD0fDp2As7l9DLbPuv_Ez-VstKjtgxgI7d4kI-ZsrckHR7kSdhFXNyoMnhOQ",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    console.log("✅ Notificación enviada a Discord");
    return true;
  } catch (error) {
    console.error("❌ Error enviando notificación a Discord:", error);
    return false;
  }
};
