"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Users, Trophy, Clock, Brain, Target, Play, CheckCircle, Gamepad2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-gradient-to-r from-amber-50 to-yellow-50 sticky top-0 z-50 border-amber-200">
        <Link className="flex items-center justify-center" href="/">
          <Gamepad2 className="h-8 w-8 text-amber-600" />
          <span className="ml-2 text-2xl font-bold text-amber-950">QuizBattle</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors" href="#features">
            Features
          </Link>
          <Link
            className="text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors"
            href="#how-it-works"
          >
            How It Works
          </Link>
        </nav>
        <div className="ml-6 flex gap-2">
          <Button
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() => {
              router.push("/auth")
            }}
          >
            Sign In
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-12 xl:grid-cols-[600px_1fr]">
              <div className="flex items-center justify-center order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 rounded-lg blur-3xl opacity-30"></div>
                  <Card className="relative bg-white border-2 border-amber-600 shadow-2xl">
                    <CardHeader className="text-center border-b border-amber-200">
                      <div className="flex justify-center mb-2">
                        <Badge variant="default" className="bg-amber-600">
                          GAME LOBBY
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-amber-950">Geography Masters</CardTitle>
                      <CardDescription className="text-amber-700">Created by Alex_Quiz</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="text-center">
                        <div className="text-sm text-amber-700 mb-2">Category: World Geography</div>
                        <div className="text-sm text-amber-700 mb-4">Questions: 10 | Time: 30s each</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-amber-50 rounded">
                          <span className="text-sm font-medium text-amber-950">Sarah_K</span>
                          <Badge variant="outline" className="text-xs text-amber-700">
                            Pending
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-amber-100 rounded">
                          <span className="text-sm font-medium text-amber-950">Mike_Quiz</span>
                          <Badge variant="default" className="text-xs bg-amber-600">
                            Accepted
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-amber-50 rounded">
                          <span className="text-sm font-medium text-amber-950">Quiz_Master</span>
                          <Badge variant="outline" className="text-xs text-amber-700">
                            Pending
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-amber-200">
                        <div className="text-sm text-amber-700">Players: 2/4</div>
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                          Start Game
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit bg-amber-200 text-amber-900">
                    <Zap className="w-3 h-3 mr-1" />
                    Real-time Battles
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-amber-950">
                    Challenge Your Mind in
                    <span className="text-amber-600"> Real-Time MCQ Battles</span>
                  </h1>
                  <p className="max-w-[600px] text-amber-700 md:text-xl">
                    Create custom MCQ battles or join exciting games created by other players. Host your own quiz rooms,
                    accept challengers, and compete in real-time multiple choice battles.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => {
                      router.push("/dashboard/my-games")
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Battle Now
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-amber-700">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-amber-600" />
                    Free to play
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-amber-600" />
                    No downloads required
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-amber-600" />
                    Cross-platform
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-yellow-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-amber-950">
                  Why Choose QuizBattle?
                </h2>
                <p className="max-w-[900px] text-amber-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience the thrill of real-time competition with features designed for the ultimate quiz
                  experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="relative overflow-hidden bg-white border-amber-600 border">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-2">
                    <Zap className="w-6 h-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-amber-950">Lightning Fast Battles</CardTitle>
                  <CardDescription className="text-amber-700">
                    Engage in rapid-fire MCQ battles with real-time responses and instant feedback.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden bg-white border-amber-600 border">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-amber-950">Host Your Own Games</CardTitle>
                  <CardDescription className="text-amber-700">
                    Create custom quiz battles with your preferred settings and approve players who want to join.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden bg-white border-amber-600 border">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-2">
                    <Brain className="w-6 h-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-amber-950">Diverse Categories</CardTitle>
                  <CardDescription className="text-amber-700">
                    Choose from hundreds of categories including science, history, sports, and more.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden bg-white border-amber-600 border">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-2">
                    <Trophy className="w-6 h-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-amber-950">Competitive Rankings</CardTitle>
                  <CardDescription className="text-amber-700">
                    Climb the global leaderboards and earn achievements as you improve your skills.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden bg-white border-amber-600 border">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-2">
                    <Target className="w-6 h-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-amber-950">Adaptive Difficulty</CardTitle>
                  <CardDescription className="text-amber-700">
                    Questions adapt to your skill level, ensuring challenging yet fair gameplay.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden bg-white border-amber-600 border">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-2">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-amber-950">Time Pressure</CardTitle>
                  <CardDescription className="text-amber-700">
                    Quick thinking is rewarded with bonus points in our time-based scoring system.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-amber-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-amber-950">How It Works</h2>
                <p className="max-w-[900px] text-amber-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create your own quiz battles or join existing games in four simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-start gap-8 py-12 lg:grid-cols-4 lg:gap-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-amber-950">Create Your Game</h3>
                <p className="text-amber-700">
                  Set up your quiz battle by choosing category, difficulty, number of questions, and player limit.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-amber-950">Players Request to Join</h3>
                <p className="text-amber-700">
                  Your game appears in the lobby where other players can see it and send requests to join your battle.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-amber-950">Accept Players</h3>
                <p className="text-amber-700">
                  Review join requests and accept the players you want to battle with. You control who enters your game.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-bold text-amber-950">Start the Battle</h3>
                <p className="text-amber-700">
                  Once you have enough players, start the real-time MCQ battle and compete for the highest score!
                </p>
              </div>
            </div>

            {/* Alternative flow for joining games */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-8 text-amber-950">Or Join an Existing Game</h3>
              <div className="mx-auto grid max-w-4xl items-start gap-8 lg:grid-cols-3 lg:gap-12">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    1
                  </div>
                  <h4 className="text-lg font-bold text-amber-950">Browse Games</h4>
                  <p className="text-amber-700">
                    Explore available games in the lobby and find battles that match your interests.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    2
                  </div>
                  <h4 className="text-lg font-bold text-amber-950">Request to Join</h4>
                  <p className="text-amber-700">Send a join request to the game creator and wait for their approval.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    3
                  </div>
                  <h4 className="text-lg font-bold text-amber-950">Get Accepted & Play</h4>
                  <p className="text-amber-700">
                    Once accepted, join the battle and compete against other approved players.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-amber-500 to-orange-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Test Your Knowledge?
                </h2>
                <p className="max-w-[600px] text-orange-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join millions of players in the ultimate real-time quiz battle experience. Your first battle is just
                  one click away.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-amber-600 hover:bg-gray-100"
                  onClick={() => {
                    router.push("/dashboard/my-games")
                  }}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Your First Battle
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-amber-600 hover:bg-gray-100"
                  onClick={() => {
                    router.push("/auth")
                  }}
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-amber-200 bg-amber-50">
        <p className="text-xs text-amber-700">© 2025 QuizBattle. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs text-amber-700 hover:text-amber-900 underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs text-amber-700 hover:text-amber-900 underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs text-amber-700 hover:text-amber-900 underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
