let paranoia = 0;
let maximalna_paranoia = 420;

let dokuda_paranoish = {
    x: maximalna_paranoia,
    y: maximalna_paranoia / 1.5
};

let menlivo_paranoino = false;

let rovno_stiky = 2;
let esli_slishkom_strashno = 0;

let naskolko_ispugan = 17;
let naskolko_uspokoilsya = -6;
let koef_sposoistviya = 45;

let kak_dolgo_plushchit = 23;
let bystro_chy_potroshky = kak_dolgo_plushchit;

let kuda_podgibat = 0;
const suda_podgibat = {
    x: 0,
    y: 0
};

let kak_nedavno_boyalis = [];
let dadya_malyar = null;
let DYADYA_MALYAR__ATGIGAY = false;

// Current point of the curve
let currentPoint = { x: 0, y: 0 };

function clikaem_po_domu_dlya_malyarevchika() {
    const tak_a_trechek_de = document.querySelector('audio');
    tak_a_trechek_de.play();
    document.querySelector('#MALYARSKAYA_PERCHATKA').style.display = 'none';
    DYADYA_MALYAR__ATGIGAY = true
}

let stena; 
let malyar;


window.onload = function () {
    document.querySelector('#stuchim_suda_v_akoshko').addEventListener('click', clikaem_po_domu_dlya_malyarevchika)

    stena = new stena_na_malyareivchike();
    
    // Initialize the starting point
    currentPoint = { x: stena.otkuda_paranoim.x, y: stena.otkuda_paranoim.y };
    targetPoint = { x: stena.otkuda_paranoim.x, y: stena.otkuda_paranoim.y };

    malyar = new malyar_v_dele(stena);
    malyar.oboznachil_centralnyi_dotik();

    // Example: Increase paranoia level continuously
    dadya_malyar = setInterval(() => updateParanoia(naskolko_ispugan), kak_dolgo_plushchit);

    // Event listener for arrow keys to change skorost_ispuga
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            naskolko_ispugan -= 1; // Decrease but not below 1
        } else if (event.key === 'ArrowRight') {
            naskolko_ispugan += 1; // Increase
        } else if (event.key === 'm') {
            menlivo_paranoino = !menlivo_paranoino;
            if (!menlivo_paranoino)
                dokuda_paranoish.x = maximalna_paranoia; // Increase
        } else if (event.key === 'ArrowUp') {
            koef_sposoistviya = Math.min(100, koef_sposoistviya + 5);
        } else if (event.key === 'ArrowDown') {
            koef_sposoistviya = Math.max(0, koef_sposoistviya - 5);
        } else if (event.key === 'e') {
            esli_slishkom_strashno = Math.min(maximalna_paranoia, esli_slishkom_strashno + 5);
        } else if (event.key === 'q') {
            esli_slishkom_strashno = Math.max(0, esli_slishkom_strashno - 5);
        }
        else if (event.key === 'p') {
            maximalna_paranoia = Math.min(420, maximalna_paranoia + 10);
            dokuda_paranoish.x = maximalna_paranoia;
            dokuda_paranoish.y = maximalna_paranoia / 1.5;
        } else if (event.key === 's') {
            maximalna_paranoia = Math.max(0, maximalna_paranoia - 10);
            dokuda_paranoish.x = maximalna_paranoia;
            dokuda_paranoish.y = maximalna_paranoia / 1.5;
        }
    });

    // };
};

// Function to update paranoia level
function updateParanoia(naskolko_ispugan) {
    if (!DYADYA_MALYAR__ATGIGAY)
        return
    if (menlivo_paranoino && dokuda_paranoish.x <= stena.centralnyi_dotik_that_we_dropik.x)
        dokuda_paranoish.x += 2;

    const a_naskolko_ispugan = Math.random() * (naskolko_ispugan - naskolko_uspokoilsya) + naskolko_uspokoilsya * (1 + koef_sposoistviya / 100);
    // const a_naskolko_ispugan = Math.random() * naskolko_ispugan;
    paranoia += a_naskolko_ispugan;
    kuda_podgibat = uznat_kuda_podgibat(paranoia);

    currentPoint.x = targetPoint.x;
    currentPoint.y = targetPoint.y;

    targetPoint.x = stena.centralnyi_dotik_that_we_dropik.x + paranoia;

    suda_podgibat.x = currentPoint.x + (targetPoint.x - currentPoint.x) / 2;
    suda_podgibat.y = stena.otkuda_paranoim.y + kuda_podgibat;

    bystro_chy_potroshky = (Math.random() + 10) * kak_dolgo_plushchit;

    kak_nedavno_boyalis.push({
        currentPointX: currentPoint.x,
        currentPointY: currentPoint.y,
        sudaPodgibatX: suda_podgibat.x,
        sudaPodgibatY: suda_podgibat.y,
        targetPointX: targetPoint.x,
        targetPointY: targetPoint.y,
        bystro_chy_potroshky: bystro_chy_potroshky,
        naskolko_ispugalis: a_naskolko_ispugan
    });

    if (paranoia >= dokuda_paranoish.x) {
        clearInterval(dadya_malyar);
        let current = 1;
        debugger
        while (kak_nedavno_boyalis.length - esli_slishkom_strashno > 0) {
            let current_boyazn = kak_nedavno_boyalis.at(-1);

            const current_dotik = new dotik(current_boyazn.currentPointX, current_boyazn.currentPointY),
                dotik_podgiba = new dotik(current_boyazn.sudaPodgibatX, current_boyazn.sudaPodgibatY),
                next_dotik = new dotik(current_boyazn.targetPointX, current_boyazn.targetPointY);

            setTimeout(() => {
                debugger
                malyar.nagotuvavsya_i_pishov_pishov(
                    current_dotik,
                    dotik_podgiba,
                    next_dotik,
                    current_boyazn.bystro_chy_potroshky,
                    malyar_v_dele.chym_maliuem.ganchirka_malyara
                )
            }, current);

            paranoia = Math.max(0, paranoia - current_boyazn.naskolko_ispugalis);


            targetPoint.x = current_boyazn.targetPointX;
            targetPoint.y = current_boyazn.targetPointY;

            kak_nedavno_boyalis.pop();
            current += 5;
        }

        setTimeout(() => {
            dadya_malyar = setInterval(() => updateParanoia(naskolko_ispugan), kak_dolgo_plushchit);
        }, current + 300)

        if (!esli_slishkom_strashno) {
            kak_nedavno_boyalis = [];
            paranoia = 0;
        }

        if (menlivo_paranoino)
            dokuda_paranoish.x = paranoia + 10;

        return
    }
    
    const current_dotik = new dotik(currentPoint.x, currentPoint.y),
        dotik_podgiba = new dotik(suda_podgibat.x, suda_podgibat.y),
        next_dotik = new dotik(targetPoint.x, targetPoint.y);

    malyar.nagotuvavsya_i_pishov_pishov(
        current_dotik,
        dotik_podgiba,
        next_dotik,
        bystro_chy_potroshky);
}


function uznat_kuda_podgibat(paranoia) {
    const spredik = Math.max(0, (paranoia / dokuda_paranoish.x) * dokuda_paranoish.y - rovno_stiky);
    const razdvinul_spredik = {
        vgoru: spredik,
        vnyz: -spredik
    };

    const tak_kuda_podgibat = Math.random() * (razdvinul_spredik.vgoru - razdvinul_spredik.vnyz) + razdvinul_spredik.vnyz;
    return tak_kuda_podgibat;
}





class paranoika {

}



class dotik {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}



class stena_na_malyareivchike {
    kolir_stenki_v_temnote = 'black';

    #canvas_of_infinite_dvizhes;
    tuta_malyar_atgigae;

    centralnyi_dotik_that_we_dropik;
    otkuda_paranoim;

    constructor() {
        this.#canvas_of_infinite_dvizhes = document.getElementById('canvas_of_infinite_dvizhes');
        this.#canvas_of_infinite_dvizhes.width = window.innerWidth;
        this.#canvas_of_infinite_dvizhes.height = window.innerHeight;

        this.tuta_malyar_atgigae = this.#canvas_of_infinite_dvizhes.getContext('2d');
        this.tuta_malyar_atgigae.fillStyle = this.kolir_stenki_v_temnote;
        this.tuta_malyar_atgigae.fillRect(0, 0, this.#canvas_of_infinite_dvizhes.width, this.#canvas_of_infinite_dvizhes.height);
        

        this.centralnyi_dotik_that_we_dropik = new dotik(
            this.#canvas_of_infinite_dvizhes.width / 2,
            this.#canvas_of_infinite_dvizhes.height / 2
        );

        this.otkuda_paranoim = new dotik(
            this.centralnyi_dotik_that_we_dropik.x,
            this.centralnyi_dotik_that_we_dropik.y / 3
        )
    }
}



class malyar_v_dele {

    //#region sho u malyara v karmashkah na malyareivchike

    static chym_maliuem = Object.freeze({
        kraska_malyara_pepelnaya: { kolir: '#ABB3B1', shyryna: 1 },
        ganchirka_malyara: { kolir: 'black', shyryna: 3 }
    });

    #yak_zateniayemo = Object.freeze({
        na_skiky_posunem: 7,
        sho_po_samomu_shedowu: 'rgba(0, 0, 0, 0.5)',
        blurik: 40,
    });

    //#endregion



    //#region znaishov_stinu_pid_na_paranoii

    #stena_na_malyareivchike;

    constructor(stena_na_malyareivchike) {
        this.#stena_na_malyareivchike = stena_na_malyareivchike;
    }

    //#endregion



    //#region tut malyar atgygae

    oboznachil_centralnyi_dotik(instrumentik = malyar_v_dele.chym_maliuem.kraska_malyara_pepelnaya) {
        this.#stena_na_malyareivchike.tuta_malyar_atgigae.beginPath();
        this.#stena_na_malyareivchike.tuta_malyar_atgigae.arc(this.#stena_na_malyareivchike.centralnyi_dotik_that_we_dropik.x, this.#stena_na_malyareivchike.centralnyi_dotik_that_we_dropik.y, 2, 0, 2 * Math.PI);

        this.#stena_na_malyareivchike.tuta_malyar_atgigae.fillStyle = instrumentik.kolir;
        this.#stena_na_malyareivchike.tuta_malyar_atgigae.fill();
        
        this.#stena_na_malyareivchike.tuta_malyar_atgigae.closePath();
    }

    nagotuvavsya_i_pishov_pishov(current_dotik, dotik_podgiba, next_dotik, kak_dolgo_bude_plushchit, instrumentik = malyar_v_dele.chym_maliuem.kraska_malyara_pepelnaya) {
        let start = null;

        const step = (timestamp) => {
            if (start === null)
                start = timestamp;

            var delta = timestamp - start,
                progress = Math.min(delta / kak_dolgo_bude_plushchit, 1);

            this.#pishov_pishov(current_dotik, dotik_podgiba, next_dotik, 0, progress);
            this.#pishov_pishov(this.#get_dzerkalnyi_dotik(current_dotik), this.#get_dzerkalnyi_dotik(dotik_podgiba), this.#get_dzerkalnyi_dotik(next_dotik), 0, progress);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        this.#pidgotuem_polotno(instrumentik, current_dotik.x > this.#stena_na_malyareivchike.centralnyi_dotik_that_we_dropik.x);
        window.requestAnimationFrame(step);
    }

    #pidgotuem_polotno(instrumentik, chy_boimsya_zaraz) {
        this.#stena_na_malyareivchike.tuta_malyar_atgigae.strokeStyle = instrumentik.kolir;
        this.#stena_na_malyareivchike.tuta_malyar_atgigae.lineWidth = instrumentik.shyryna;

        this.#stena_na_malyareivchike.tuta_malyar_atgigae.shadowOffsetX = this.#yak_zateniayemo.na_skiky_posunem * (chy_boimsya_zaraz ? -1 : 1);
        this.#stena_na_malyareivchike.tuta_malyar_atgigae.shadowColor = this.#yak_zateniayemo.sho_po_samomu_shedowu;
        this.#stena_na_malyareivchike.tuta_malyar_atgigae.shadowBlur = this.#yak_zateniayemo.blurik;
    }

    #pishov_pishov(current_dotik, dotik_podgiba, next_dotik, taimlain_pochatku, taimlain_kincya) {
        const pershyi_kadr_skipaem = taimlain_kincya == taimlain_pochatku;
        if (pershyi_kadr_skipaem)
            return;

        const vzhe_v_kinci_lainu = 0.0 == taimlain_pochatku && taimlain_kincya == 1.0;
        if (vzhe_v_kinci_lainu) {
            this.#risuem_paranoinyi_dvizhulik(current_dotik, dotik_podgiba, next_dotik);
            return;
        }

        const current_dotik_na_freime = this.#dai_dotik_na_krau_freima(current_dotik, dotik_podgiba, next_dotik, taimlain_pochatku);
        const next_dotik_na_freime = this.#dai_dotik_na_krau_freima(current_dotik, dotik_podgiba, next_dotik, taimlain_kincya);
        const dotik_podgiba_na_freime = this.#dotik_podgiba_na_freime(current_dotik, dotik_podgiba, next_dotik, taimlain_pochatku, taimlain_kincya);

        this.#risuem_paranoinyi_dvizhulik(current_dotik_na_freime, dotik_podgiba_na_freime, next_dotik_na_freime);

    }

    #risuem_paranoinyi_dvizhulik(current_dotik, dotik_podgiba, next_dotik) {
        this.#stena_na_malyareivchike.tuta_malyar_atgigae.beginPath();

        this.#stena_na_malyareivchike.tuta_malyar_atgigae.moveTo(current_dotik.x, current_dotik.y);
        this.#stena_na_malyareivchike.tuta_malyar_atgigae.quadraticCurveTo(dotik_podgiba.x, dotik_podgiba.y, next_dotik.x, next_dotik.y);

        this.#stena_na_malyareivchike.tuta_malyar_atgigae.stroke();
        this.#stena_na_malyareivchike.tuta_malyar_atgigae.closePath();
    }

    //#endregion



    //#region tut zaglyadaem v mirror

    #get_dzerkalnyi_dotik = (dotichek) => new dotik(2 * this.#stena_na_malyareivchike.centralnyi_dotik_that_we_dropik.x - dotichek.x, dotichek.y);

    //#endregion



    //#region tut beremo dotiky po freimah of animation

    #dai_dotik_na_krau_freima = (current_dotik, dotik_podgiba, next_dotik, taimlain) => {
        const t00 = taimlain * taimlain,
            t01 = 1.0 - taimlain,
            t02 = t01 * t01,
            t03 = 2.0 * taimlain * t01;

        return this.#dotik_na_freime(current_dotik, dotik_podgiba, next_dotik, t00, t02, t03);
    }

    #dotik_na_freime = (current_dotik, dotik_podgiba, next_dotik, t00, t02, t03) => new dotik(
        t02 * current_dotik.x + t03 * dotik_podgiba.x + t00 * next_dotik.x,
        t02 * current_dotik.y + t03 * dotik_podgiba.y + t00 * next_dotik.y
    );

    #dotik_podgiba_na_freime = (current_dotik, dotik_podgiba, next_dotik, taimlain_pochatku, taimlain_kincya) => {
        /* Liniyno interpolyuye mizh dvoma namberami */
        const gladenko_vodym_kistiu = (v0, v1, taimlain) => (1.0 - taimlain) * v0 + taimlain * v1;

        return new dotik(
            gladenko_vodym_kistiu(gladenko_vodym_kistiu(current_dotik.x, dotik_podgiba.x, taimlain_pochatku), gladenko_vodym_kistiu(dotik_podgiba.x, next_dotik.x, taimlain_pochatku), taimlain_kincya),
            gladenko_vodym_kistiu(gladenko_vodym_kistiu(current_dotik.y, dotik_podgiba.y, taimlain_pochatku), gladenko_vodym_kistiu(dotik_podgiba.y, next_dotik.y, taimlain_pochatku), taimlain_kincya)
        );
    }

    // #endregion
}