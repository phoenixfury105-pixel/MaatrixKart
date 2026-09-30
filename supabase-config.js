// =====================================================
// MAATRIXKART - SUPABASE CONFIGURATION
// =====================================================

const SUPABASE_URL =
    "https://oomlcnnxlojivphklmsl.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_eAX0xk7lPT_lx2ybH7xQ0A_Y0uqQYdz";


// =====================================================
// CHECK SUPABASE LIBRARY
// =====================================================

if (
    typeof window.supabase === "undefined" ||
    typeof window.supabase.createClient !== "function"
) {

    console.error(
        "❌ Supabase library is not loaded."
    );

    alert(
        "Supabase library is not loaded.\n\n" +
        "Add the Supabase CDN before supabase-config.js."
    );

} else {

    // =================================================
    // CREATE CLIENT
    // =================================================

    const db = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        }
    );


    // =================================================
    // MAKE CLIENT AVAILABLE GLOBALLY
    // =================================================

    window.db = db;

    window.MaatrixKartSupabase = db;


    console.log(
        "✅ MaatrixKart Supabase connected successfully."
    );
}


// =====================================================
// GET CURRENT USER
// =====================================================

window.getMaatrixUser = async function () {

    if (!window.db) {
        return null;
    }

    try {

        const {
            data,
            error
        } = await window.db.auth.getUser();

        if (error) {
            console.error(
                "Supabase user error:",
                error
            );
            return null;
        }

        return data.user || null;

    } catch (error) {

        console.error(error);

        return null;
    }
};


// =====================================================
// GET CURRENT SESSION
// =====================================================

window.getMaatrixSession = async function () {

    if (!window.db) {
        return null;
    }

    try {

        const {
            data,
            error
        } = await window.db.auth.getSession();

        if (error) {

            console.error(
                "Supabase session error:",
                error
            );

            return null;
        }

        return data.session || null;

    } catch (error) {

        console.error(error);

        return null;
    }
};


// =====================================================
// LOGOUT
// =====================================================

window.maatrixLogout = async function () {

    if (!window.db) {
        return;
    }

    try {

        const {
            error
        } = await window.db.auth.signOut();

        if (error) {
            console.error(
                "Logout error:",
                error
            );
            return;
        }

        window.location.href = "login.html";

    } catch (error) {

        console.error(error);

    }
};