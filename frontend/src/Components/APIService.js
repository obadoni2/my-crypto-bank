export default class APIService {
  static async RegisterNewUser(body) {
    console.log(body);
    const resp = await fetch("http://127.0.0.1:5000/auth/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    });

    const data = await resp.json();

    return data;
  }
}
