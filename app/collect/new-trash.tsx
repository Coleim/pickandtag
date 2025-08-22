
import { buttonStyles } from "@/constants/ButtonStyles";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NewTrash() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Take a photo{"\n"}of the trash
                </Text>
                <Text style={styles.subtitle}>
                    Snap a picture of the trash you collected
                </Text>
                <View style={styles.cameraBox}>
                    <TrashCamera />
                </View>
                <TouchableOpacity style={buttonStyles.primary}>
                    <Text style={buttonStyles.primaryText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyles.secondary, buttonStyles.smaller, styles.bottomArea]}>
                    <Text style={buttonStyles.secondaryText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


function TrashCamera() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function takePicture() {
        // loader
        console.log('take picture');
        if (cameraRef.current) {
            cameraRef.current.takePictureAsync().then(photo => {
                console.log('photo', photo);
            }).catch(error => {
                console.error('Error taking picture:', error);
            });
        }
    }

    return (
        <CameraView
            ref={cameraRef}
            style={styles.cameraPreview}
            facing='back'
        />
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCFBF5",
        flexDirection: 'column',
    },
    content: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 24,
        justifyContent: "flex-start",
    },
    title: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        fontWeight: "700",
        color: "#363C3B",
        marginBottom: 12,
        lineHeight: 38
    },
    subtitle: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        color: "#6B6F6E",
        marginBottom: 40
    },
    cameraBox: {
        width: 320,
        height: 240,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40
    },
    cameraPreview: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 24,
        overflow: "hidden",
        alignSelf: "center",
        borderWidth: 5,
        borderColor: "#E3E3DD",
        backgroundColor: "#FCFBF5",
    },
    primaryButton: {
        backgroundColor: "#2E7D32",
        borderRadius: 10,
        paddingVertical: 10,
        width: "80%",
        alignSelf: "center",
        alignItems: "center",
        shadowColor: "#2E7D32",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8
    },
    primaryButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 24
    },
    secondaryButton: {
        backgroundColor: "#0288D1",
        borderRadius: 10,
        paddingVertical: 8,
        width: "60%",
        alignSelf: "center",
        alignItems: "center",
        shadowColor: "#0288D1",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        marginBottom: 12,
    },
    bottomArea: {
        width: "40%",
        margin: "auto",
        marginBottom: 20,
        justifyContent: 'flex-end',
    },
    secondaryButtonText: {
        color: "#37474F",
        fontWeight: "400",
        fontSize: 20
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 64,
        borderTopWidth: 1,
        borderColor: "#E3E3DD",
        backgroundColor: "#FCFBF5"
    }
});