'use client'
import { Button, Input } from "@/components/ui"
import { use, useEffect, useState } from "react"
import { set } from "react-hook-form"
// 係數：
// 1.2=大部分臥床
// 1.3=沒有運動習慣，長時間久坐，如上班族
// 1.375=每週1-3天輕度運動，例如散步、快走
// 1.55=每週3-5天有氧運動、徒手健身
// 1.725=每週5-7天高強度運動，重訓（大重量）、拳擊
// 1.9=運動員，每天至少4小時以上的運動訓練

const tdeeList = [
  { label: 'sedentary', value: 1.2, description: '大部分臥床' },
  { label: 'light', value: 1.3, description: '沒有運動習慣，長時間久坐，如上班族' },
  { label: 'moderate', value: 1.375, description: '每週1-3天輕度運動，例如散步、快走' },
  { label: 'active', value: 1.55, description: '每週3-5天有氧運動、徒手健身' },
  { label: 'very active', value: 1.725, description: '每週5-7天高強度運動，重訓（大重量）、拳擊' },
  { label: 'super active', value: 1.9, description: '運動員，每天至少4小時以上的運動訓練' },
];

export default function Home() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState<number | 'can\'t calculate'>(0)
  const [idealWeight, setIdealWeight] = useState<number | 'can\'t calculate'>(0)
  const [age, setAge] = useState("")
  const [gbmr, setGBmr] = useState<number | 'can\'t calculate'>(0)
  const [bbmr, setBBmr] = useState<number | 'can\'t calculate'>(0)

  useEffect(() => {
    if (!height || !weight) {
      setBmi(0)
      return
    }
    const h = Number(height) / 100
    const w = Number(weight)
    if (isNaN(h) || isNaN(w)) {
      setBmi('can\'t calculate')
      return
    }
    setBmi(w / (h * h))
  }, [height, weight])

  useEffect(() => {
    if (!height) {
      setIdealWeight(0)
      return
    }
    const h = Number(height)
    if (isNaN(h)) {
      setIdealWeight('can\'t calculate')
      return
    }
    setIdealWeight((22 * h * h) / 10000)
  }, [height])

  useEffect(() => {
    if (!age) {
      setGBmr(0)
      return
    }
    const a = Number(age)
    if (isNaN(a)) {
      setGBmr('can\'t calculate')
      return
    }
    // GBMR＝655＋(9.6 x 體重KG)＋(1.8 x 身高cm) — (4.7 x 年齡）
    const res = 655 + (9.6 * Number(weight)) + (1.8 * Number(height)) - (4.7 * a)
    if (isNaN(res)) {
      setGBmr('can\'t calculate')
      return
    }
    setGBmr(res)
  }, [age, weight, height])

  useEffect(() => {
    if (!age) {
      setBBmr(0)
      return
    }
    const a = Number(age)
    if (isNaN(a)) {
      setBBmr('can\'t calculate')
      return
    }
    // BBMR＝66＋(13.7 x 體重KG)＋(5 x 身高cm) — (6.8 x 年齡）
    const res = 66 + (13.7 * Number(weight)) + (5 * Number(height)) - (6.8 * a)
    if (isNaN(res)) {
      setBBmr('can\'t calculate')
      return
    }
    setBBmr(res)
  }, [age, weight, height])

  function reset() {
    setHeight("")
    setWeight("")
  }

  function resetAge() {
    setAge("")
  }

  return (
    <div className="mx-auto container pt-4">
      <h1 className="text-2xl font-bold mb-4">BMI Calculator</h1>
      <div className="flex w-full gap-4">
        <div className="flex-1 flex flex-col gap-2">
          height (cm)
          <Input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          weight (kg)
          <Input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <Button className="mt-auto" onClick={reset}>Reset</Button>
      </div>

      <div className="mt-4 flex gap-4">
        <div className="flex flex-col gap-2">
          <div>
            BMI: {bmi}
          </div>
          <div className="text-sm text-gray-400">
            ideal BMI: 18.5 - 24.9
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            Ideal weight: {idealWeight}
          </div>
          <div className="text-sm text-gray-400">
            Calculation formula: 22 * height (m) * height (m)
          </div>
        </div>

      </div>

      {/* BMR */}

      <hr className="my-4" />
      <div className="mt-4">
        <h1 className="text-2xl font-bold mb-2">BMR & TDEE Calculator</h1>
        <div className="flex w-full gap-4">
          <div className="flex-1 flex flex-col gap-2">
            age
            <Input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <Button className="mt-auto" onClick={resetAge}>Reset</Button>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex flex-col gap-2">
            <div>
              girl bmr: {gbmr}
            </div>
            <div className="text-sm text-gray-400">
              girl: 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              boy bmr: {bbmr}
            </div>
            <div className="text-sm text-gray-400">
              <span className="">form gpt : </span>
              boy: 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
            </div>
          </div>
        </div>

        <ul className="flex flex-col gap-2 mt-4">
          {tdeeList.map((item) => (
            <li key={item.label} className="flex gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 flex-wrap">
                  <span>
                    {item.value} TDEE:
                  </span>
                  <span>
                    girl {item.value * Number(gbmr)}
                  </span>
                  <span>
                    boy {item.value * Number(bbmr)}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  {item.description}
                </div>
              </div>
            </li>
          ))}
        </ul>

      </div>

    </div>
  )
}