
import { buttonStyles } from "@/constants/ButtonStyles";
import { Colors } from "@/constants/Colors";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NewTrash() {
    const [takePhoto, setTakePhoto] = useState(false);
    const router = useRouter();

    const handlePhotoTaken = useCallback((uri: string) => {
        console.log( 'Photo taken with URI:', uri );
        // setPhotoUri(uri);
        setTakePhoto(false);
    }, []);

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
                    <TrashCamera takePhoto={takePhoto} onPhotoTaken={handlePhotoTaken} />
                </View>
                <TouchableOpacity onPress={() => setTakePhoto(true)} style={buttonStyles.primary}>
                    <Text style={buttonStyles.primaryText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => router.back() } style={[buttonStyles.secondary, buttonStyles.smaller, styles.bottomArea]}>
                    <Text style={buttonStyles.secondaryText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}



function TrashCamera({ takePhoto, onPhotoTaken }: {takePhoto: boolean, onPhotoTaken: (uri: string) => void}) {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    useEffect(() => {
        if (takePhoto) {
            const snap = async () => {
                if (!cameraRef.current) return;
                const photo = await cameraRef.current.takePictureAsync();
                onPhotoTaken(photo.uri);
            };
            snap();
        }
    }, [takePhoto, onPhotoTaken]);

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
        backgroundColor: Colors.background,
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
        color: Colors.text,
        marginBottom: 12,
        lineHeight: 38
    },
    subtitle: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        color: Colors.text,
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
        borderRadius: 12,
        borderWidth: 4,
        borderColor: Colors.accent,
        backgroundColor: Colors.background,
    },
    bottomArea: {
        width: "40%",
        margin: "auto",
        marginBottom: 20,
        justifyContent: 'flex-end',
    }
});