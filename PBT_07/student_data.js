const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let countGioi = 0, countKha = 0, countTB = 0, countYeu = 0;

let maxAvg = -1, minAvg = 11;
let bestStudent = "", worstStudent = "";

let totalMath = 0, totalPhysics = 0, totalCS = 0;

let totalMaleAvg = 0, totalFemaleAvg = 0;
let countMale = 0, countFemale = 0;

console.log("| STT | Tên     | TB   | Xếp loại    |");
console.log("|-----|---------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    const sv = students[i];

    let avg = (sv.math * 0.4) + (sv.physics * 0.3) + (sv.cs * 0.3);
    avg = Math.round(avg * 10) / 10; 

    let xepLoai = "";
    if (avg >= 8.0) {
        xepLoai = "Giỏi";
        countGioi++;
    } else if (avg >= 6.5) {
        xepLoai = "Khá";
        countKha++;
    } else if (avg >= 5.0) {
        xepLoai = "Trung bình";
        countTB++;
    } else {
        xepLoai = "Yếu";
        countYeu++;
    }

    const stt = i + 1;
    const nameStr = sv.name.padEnd(7, ' ');
    const avgStr = avg.toFixed(1).padEnd(4, ' ');
    const xlStr = xepLoai.padEnd(11, ' ');
    console.log(`| ${stt.toString().padEnd(3, ' ')} | ${nameStr} | ${avgStr} | ${xlStr} |`);

    if (avg > maxAvg) {
        maxAvg = avg;
        bestStudent = sv.name;
    }
    if (avg < minAvg) {
        minAvg = avg;
        worstStudent = sv.name;
    }

    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCS += sv.cs;

    if (sv.gender === "M") {
        totalMaleAvg += avg;
        countMale++;
    } else if (sv.gender === "F") {
        totalFemaleAvg += avg;
        countFemale++;
    }
}

console.log("|-----|---------|------|-------------|\n");


console.log("== THỐNG KÊ XẾP LOẠI ==");
console.log(`- Giỏi: ${countGioi} SV`);
console.log(`- Khá: ${countKha} SV`);
console.log(`- Trung bình: ${countTB} SV`);
console.log(`- Yếu: ${countYeu} SV\n`);

console.log("== CAO NHẤT & THẤP NHẤT ==");
console.log(`- SV có điểm TB cao nhất: ${bestStudent} (${maxAvg.toFixed(1)})`);
console.log(`- SV có điểm TB thấp nhất: ${worstStudent} (${minAvg.toFixed(1)})\n`);

console.log("== ĐIỂM TRUNG BÌNH TOÀN LỚP THEO MÔN ==");
console.log(`- Toán (Math): ${(totalMath / students.length).toFixed(1)}`);
console.log(`- Lý (Physics): ${(totalPhysics / students.length).toFixed(1)}`);
console.log(`- Tin (CS): ${(totalCS / students.length).toFixed(1)}\n`);

console.log("== BONUS: ĐIỂM TRUNG BÌNH THEO GIỚI TÍNH ==");
console.log(`- Nam (M): ${countMale > 0 ? (totalMaleAvg / countMale).toFixed(1) : 0}`);
console.log(`- Nữ (F): ${countFemale > 0 ? (totalFemaleAvg / countFemale).toFixed(1) : 0}`);