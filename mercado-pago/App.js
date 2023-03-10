import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const [initPoint, setInitPoint] = useState(null);

  const handlePayment = async () => {
    const response = await fetch("http://192.168.1.12:3000/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            title: "Mi Producto",
            quantity: 1,
            currency_id: "ARS",
            unit_price: 100,
          },
        ],
      }),
    });
    const preference = await response.json();
    setInitPoint(preference.init_point);
  };

  if (initPoint) {
    return (
      <WebView
        source={{ uri: initPoint }}
        style={{ marginTop: 20 }}
        onNavigationStateChange={(event) => {
          if (event.url.includes("success")) {
            console.log("Pago exitoso");
          } else if (event.url.includes("failure")) {
            console.log("Pago fallido");
          }
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Pagar" onPress={handlePayment} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "80%",
    backgroundColor: "#2196F3",
    borderRadius: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
});
