export const sendFormData = async (data: {
  name: string;
  iltizamat: string;
  buletin: boolean;
  mediaUmat: boolean;
  mediaAlwaie: boolean;
  total: number;
}): Promise<{
  status: boolean;
  message: string;
  response?: Response;
}> => {
  const url =
    "https://script.google.com/macros/s/AKfycbw6ehDbWNOK-sUiFQ_ffbG18V236QAK6G5jsYkdBI1hz-J8C4G9zy08lJd9aqhrS-4Z7w/exec";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        name: data.name,
        iltizamat: data.iltizamat,
        buletin: data.buletin ? 15000 : 0,
        mediaUmat: data.mediaUmat ? 34000 : 0,
        mediaAlwaie: data.mediaAlwaie ? 15000 : 0,
        total: data.total,
      }),
    });

    if (response.ok) {
      console.log("Data sent successfully");
    } else {
      console.error("Failed to send data");
    }

    return {
      status: true,
      message: "Data berhasil dikirim",
    };
  } catch (error) {
    console.error("Error sending data:", error);

    return {
      status: false,
      message: "Terjadi kesalahan saat mengirim data",
    };
  }
};
