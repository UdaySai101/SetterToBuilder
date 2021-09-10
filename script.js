document.querySelector('.btn').addEventListener('click', () => {

    let value = document.querySelector('.in').value;

    let lines = value.split('\n');
    let string = '';

    // Weed out empty lines
    lines = lines.map(line => line.trim());
    lines = lines.filter(line => line !== '');

    // head logic
    lines.forEach((line, ind) => {

        line = line.replace(';', '');

        if (line.includes('new') && !line.includes('.set')) {

            let constructorIndex = line.indexOf('()');

            line = line.slice(0, constructorIndex) + ".builder()";

            // To format the line
            if (line.includes(' new ')) {
                line = line.replace(' new', '');
            } else {
                line.replace('new', '')
            }

        }

        // body logic
        else if (line.includes('.set')) {

            let setterIndex = line.indexOf('.set');

            line = line.slice(setterIndex + 4);

            const char = line.charAt(0).toString().toLowerCase();

            line = "." + char + line.slice(1);

        }

        // tail logic
        if (ind + 1 === lines.length) {

            line = line.replace(';', '') + ".build();"

        }
        string += line + "\n";

    });

    document.querySelector('.in2').value = string;

});

const mq = window.matchMedia("(max-width: 450px)");
const ins = document.getElementsByClassName('in');

window.addEventListener('DOMContentLoaded', () => {
    if (mq.matches) {
        widthModifier(80, 20);
    }
    else {
        widthModifier(50, 50);
    }
})
window.addEventListener('resize', () => {
    if (mq.matches) {
        widthModifier(80, 20);
    }
    else {
        widthModifier(50, 50);
    }
})

function widthModifier(m, n) {

    for (let i = 0; i < ins.length; i++) {
        ins[i].addEventListener('click', () => {
            ins[i].style.width = `calc(${m}% - 30px)`;
            let j = (i === 0) ? 1 : 0;
            ins[j].style.width = `calc(${n}% - 30px)`;
        })
        ins[i].addEventListener('mouseout', () => {
            ins[i].style.width = 'calc(50% - 30px)';
            let j = (i === 0) ? 1 : 0;
            ins[j].style.width = 'calc(50% - 30px';
        })
    }
}


document.querySelector('#copy').addEventListener('click', () => {
    document.querySelector('.in2').select();
    document.execCommand('copy');
});