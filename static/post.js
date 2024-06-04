$(document).ready(function () {
    viewing();
});

function viewing() {
    $.ajax({
        type: "GET",
        url: "/datadiri?sample_give=halo!",
        data: {},
        success: function (response) {
            console.log(response)
        },
    });
}

function posting() {
    let jenisKelamin = $('input[name="kelamin_give"]:checked').val();
    let umur = $('input[name="usia_give"]:checked').val();
    let pendidikan = $('input[name="pendidikan_give"]:checked').val();
    let pekerjaan = $('input[name="pekerjaan_give"]:checked').val();
    let pekerjaanLainnya = $('#pekerjaan-lainnya-input').val();
    let pekerjaanValue = pekerjaan === "Lainnya" ? pekerjaanLainnya : pekerjaan;

    let jawaban = {};
    let totalSkor = 0;
    $('.pertanyaan_radio:checked').each(function () {
        let pertanyaanId = $(this).attr('name');
        let nilai = parseFloat($(this).val()); // Convert value to float
        let pilihan = $(this).next('label').text(); // Mengambil teks pilihan yang dipilih
        jawaban[pertanyaanId] = { nilai: nilai, pilihan: pilihan };
        totalSkor += nilai; // Add value to total score
    });

    let boxKritik = $('#kritik').val();
    let boxSaran = $('#saran').val();
    let layanan = $('input[name="layanan_give"]:checked').val();

    $.ajax({
        type: "POST",
        url: "/datadiri",
        data: {
            layanan_give: layanan,
            kelamin_give: jenisKelamin,
            usia_give: umur,
            pendidikan_give: pendidikan,
            pekerjaan_give: pekerjaanValue,
            kritik: boxKritik,
            saran: boxSaran,
            jawaban_pertanyaan: JSON.stringify(jawaban)  // Convert jawaban to JSON string
        },
        success: function (response) {
            console.log(response);
            $('#skor-container').show();
            $('.container').hide();
            $('.judul-survey').hide();
            $('.footer').hide();

            $('#score-value').text(response.total_skor);
            $('#score-description').text(`Terima kasih telah mengisi survey layanan kami!`);

            document.getElementById('saveBtn').addEventListener('click', function () {
                document.getElementById('myModal').style.display = 'block';
            });

            document.getElementById('yesBtn').addEventListener('click', function () {
                window.location.href = '/';
            });

            document.getElementById('noBtn').addEventListener('click', function () {
                document.getElementById('myModal').style.display = 'none';
            });

            // Close the modal if the user clicks outside of the modal
            window.onclick = function (event) {
                if (event.target == document.getElementById('myModal')) {
                    document.getElementById('myModal').style.display = 'none';
                }
            }
            // var button = $('<button>').addClass('btn-save').text('Simpan');
            // $('#skor-container').after(button);

            // button.on('click', function () {
            //     $('#myModal').css('display', 'block');
            // });

            // $('#yesBtn').on('click', function () {
            //     window.location.href = '/';
            // });

            // $('#noBtn').on('click', function () {
            //     $('#myModal').hide();
            // });
        },
        error: function (xhr, status, error) {
            console.error(xhr);
            console.error(status);
            console.error(error);
        },
    });
}


// !!! Scroll 
$(document).ready(function () {
    var lastScrollTop = 0;
    $(window).scroll(function () {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            $('.top-image').addClass('closed');
        } else {
            $('.top-image').removeClass('closed');
        }
        lastScrollTop = st;
    });
});

//  radio button p lainnya
$(document).ready(function () {
    // Menambahkan event listener untuk perubahan pada radio button pekerjaan
    $('input[name="pekerjaan_give"]').change(function () {
        if ($(this).val() === 'Lainnya') {
            $('#pekerjaan-lainnya-input').prop('disabled', false);
        } else {
            $('#pekerjaan-lainnya-input').prop('disabled', true);
        }
    });
});