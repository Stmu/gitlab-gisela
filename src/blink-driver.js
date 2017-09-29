import Blink1 from 'node-blink1'
import Color from 'color'

class blinker {
    blink(color) {
        return new Promise((resolve, reject) => {
            // console.log(Blink1.devices());

            var blink1 = new Blink1();
            blink1.fadeToRGB(1000, Number(color.red()), Number(color.green()), Number(color.blue()), () => resolve(blink1));
        })
        .then(blink1 => blink1.close());
    }
}

export default blinker;

new blinker().blink(new Color('purple'));