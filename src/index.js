const countdown = require('countdown')
const pad = require('pad')
const { Type } = require('@jedmud/tui-elements')

require('colors')

module.exports = class extends Type {
    construct() {
        this.seconds = 0
        this.timer = null
    }

    set(seconds, pad = 2, fg = 'cyan') {
        this.seconds = seconds
        this.pad = pad
        this.fg = fg

        return this
    }

    write() {
        if (this.timer !== null) {
            clearInterval(this.timer)
        }

        this.timer = countdown(new Date, t => {
            const s = this.seconds - t.seconds

            this.print([pad(this.pad, s)[this.fg]])

            if (s === 0) {
                clearInterval(this.timer)
            }
        }, countdown.SECONDS)
    }
}
