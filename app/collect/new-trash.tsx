
import { buttonStyles } from "@/constants/ButtonStyles";
import { Colors } from "@/constants/Colors";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NewTrash() {
    const [takingPhoto, setTakingPhoto] = useState(false);
    const [base64Picture, setBase64Picture] = useState<string|null>(null);
    const router = useRouter();

    const handlePhotoTaken = useCallback((base64: string) => {
        setBase64Picture(base64);
        setTakingPhoto(false);
    }, []);



    return (
        <View style={styles.container}>
            {base64Picture ? <TrashDetails base64Picture={base64Picture} /> :
            <View style={styles.content}>
                <Text style={styles.title}>
                    Take a photo{"\n"}of the trash
                </Text>
                <Text style={styles.subtitle}>
                    Snap a picture of the trash you collected
                </Text>
                <View style={styles.cameraBox}>
                    <TrashCamera takingPhoto={takingPhoto} onPhotoTaken={handlePhotoTaken} />
                </View>
                <TouchableOpacity disabled={takingPhoto} onPress={() => setTakingPhoto(true)} style={buttonStyles.primary}>
                    <Text style={buttonStyles.primaryText}>{takingPhoto? "Please wait" : "Take Photo"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => router.back() } style={[buttonStyles.secondary, buttonStyles.smaller, styles.bottomArea]}>
                    <Text style={buttonStyles.secondaryText}>Back</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    );
}

function TrashDetails({base64Picture}: {base64Picture: string}) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Add details{"\n"}about the trash
                </Text>
                <Text style={styles.subtitle}>
                    Describe the type and amount of trash you collected
                </Text>
                {/* Form inputs for trash details would go here */}
                <TouchableOpacity style={buttonStyles.primary}>
                    <Text style={buttonStyles.primaryText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


function TrashCamera({ takingPhoto, onPhotoTaken }: {takingPhoto: boolean, onPhotoTaken: (uri: string) => void}) {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    useEffect(() => {
        //todo: check permission
        if (!permission) { 
            return;
        }
        if (takingPhoto) {
            const snap = async () => {
                if (!cameraRef.current) return;
                const photo = await cameraRef.current.takePictureAsync({base64: true, quality: 0});
                if(photo.base64) {
                    onPhotoTaken(photo.base64);
                }
            };
            snap();
        }
    }, [takingPhoto, onPhotoTaken, permission]);

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
        textAlign: "center",
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
        textAlign: "center",
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