import axios, { isAxiosError } from "axios";

export interface ApplicationInfo {
    studentName: string;
    selectedRoom: number | null;
    studentId: string;
    email: string;
    date: string;
    startTime: string;
    endTime: string;
    reason: string;
}


export interface RoomPolicyInfo {
    classroom: string;
    days: string;
    start_time: string;
    end_time: string;
}

export interface Policy {
    policy: RoomPolicyInfo[];
}

export interface ReservationInfo {
    success: boolean;
    data: {
        id?: number;
        name: string;
        email: string;
        time: string;
        reason: string;
        room: number;
        auth: string;
    }[];
}

export async function fetchPolicy() {
    const res = await axios.get<Policy>("/api/fetchPolicy.php");
    return res.data;
}

export async function fetchReservation() {
    const res = await axios.get<ReservationInfo>("/api/getresv.php");
    return res.data;
}

export async function postApplication(application: ApplicationInfo) {
    const startTime = new Date(`${application.date}T${application.startTime}`);
    const endTime = new Date(`${application.date}T${application.endTime}`);

    const data = new FormData();
    data.append("room", application.selectedRoom?.toString() as string);
    data.append("email", application.email);
    data.append("time", `${startTime.getTime()}-${endTime.getTime()}`);
    data.append("name", application.studentName);
    data.append("reason", application.reason);
    data.append("sid", application.studentId);
    try {
        const res = await axios.post<{ success: boolean, message: string }>(
            "/api/addres.php",
            data,
        );
        return res.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return err.response.data;
        }
    }
}

export async function postLogin(user: string, password: string, token: string) {
    const data = new FormData()
    data.set("username", user)
    data.set("password", password)
    data.set("cf_token", token)
    try {
        const res = await axios.post<{ success: boolean, message: string, token?: string }>("/api/login.php", data)
        return res.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return err.response.data
        }
    }
}

export async function verifyAdmin(token: string) {
    const data = new FormData()
    data.set("token", token)
    try {
        const res = await axios.post<{ success: boolean, message: string }>("/api/verify_admin.php", data)
        return res.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return err.response.data
        }
    }
    
}

export async function postReservations(token: string) {
    if (token == "") return { data: [], success: false } as ReservationInfo
    const data = new FormData()
    data.set("token", token)
    const res = await axios.post<ReservationInfo>("/api/getrequests.php", data)
    return res.data
}

export async function postAccept(token: string, id: number) {
    const data = new FormData()
    data.set("token", token)
    data.set("Id", id.toString())
    try {
        const res = await axios.post<{success: boolean, message: string}>("/api/accept.php", data)
        return res.data
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            return err.response.data
        }
    }

}

export async function postReject(token: string, id: number, reason: string) {
    const data = new FormData()
    data.set("token", token)
    data.set("Id", id.toString())
    data.set("Reason", reason)
    try {
        const res = await axios.post<{success: boolean, message: string}>("/api/reject.php", data)
        return res.data
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            return err.response.data
        }
    }

}