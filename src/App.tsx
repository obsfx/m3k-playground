import { Playground } from './components/Playground'

const defaultValue = `((getval set-attribute (getval body document)) "style" "margin: 0px")

(define canvas ((getval create-element document) "canvas"))
(define ctx ((getval get-context canvas) "2d"))
(set! (getval width canvas) 400)
(set! (getval height canvas) 400)
((getval set-attribute canvas) "style" "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)")

((getval append-child (getval body document)) canvas)

(define ball
  (dict
    :x (+ (* 300 ((getval random Math))) 80)
    :y (+ (* 200 ((getval random Math))) 80)
    :r 12
    :vx 5
    :vy 2
    :update (defun ()
      (progn
        (set! (getval x ball) (+ (getval x ball) (getval vx ball)))
        (set! (getval y ball) (+ (getval y ball) (getval vy ball)))
        (if (< (getval x ball) 0) (set! (getval vx ball) (* (getval vx ball) (- 1))))
        (if (> (getval x ball) (getval width canvas)) (set! (getval vx ball) (* (getval vx ball) (- 1))))
        (if (< (getval y ball) 0) (set! (getval vy ball) (* (getval vy ball) (- 1))))
        (if (> (getval y ball) (getval height canvas)) (set! (getval vy ball) (* (getval vy ball) (- 1))))
        ))))

(define loop (defun ()
(progn
  (set! (getval fill-style ctx) "rgba(214,190,54)")
  ((getval fill-rect ctx) 0 0 (getval width canvas) (getval height canvas))
  ((getval update ball))
  ((getval begin-path ctx))
  (set! (getval fill-style ctx) "black")
  ((getval arc ctx) (getval x ball) (getval y ball) (getval r ball) 0 (* 2 (getval PI Math)))
  ((getval fill ctx))
  (request-animation-frame loop))))
(loop)`

export const App: React.FC = () => {
  return (
    <div>
      <Playground width="1360px" height="720px" code={defaultValue} />
    </div>
  )
}

export default App
