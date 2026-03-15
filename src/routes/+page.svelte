<script>
	import { resolve } from '$app/paths';
	let features = [
		{
			icon: '⏰',
			title: 'Smart Reminders',
			description: 'Never miss important tasks with intelligent notification system'
		},
		{
			icon: '🎯',
			title: 'Priority Management',
			description: 'Organize tasks by priority and get things done efficiently'
		},
		{
			icon: '📊',
			title: 'Progress Tracking',
			description: 'Monitor your productivity with detailed analytics and insights'
		},
		{
			icon: '🔔',
			title: 'Real-time Notifications',
			description: 'Stay updated with instant alerts across all your devices'
		},
		{
			icon: '🌙',
			title: 'Dark Mode',
			description: 'Comfortable viewing experience day or night'
		},
		{
			icon: '🔒',
			title: 'Secure & Private',
			description: 'Your data is encrypted and protected with industry standards'
		}
	];
</script>

<div class="min-h-screen">
	<!-- Navbar -->
	<div class="navbar bg-base-200 bg-base-200/50 sticky top-0 z-50 px-10 shadow-sm backdrop-blur-sm">
		<div class="navbar-start">
			<a href={resolve('/')} class="text-xl"> Reminder App </a>
		</div>
		<div class="navbar-end gap-2">
			<a href={resolve('/login')} class="btn btn-ghost">Login</a>
			<a href={resolve('/register')} class="btn btn-primary">Get Started</a>
		</div>
	</div>

	<!-- Hero Section -->
	<div class="hero bg-base-100 min-h-screen">
		<div class="hero-content text-center">
			<div class="max-w-4xl">
				<h1 class="mb-6 text-5xl leading-tight font-bold md:text-6xl">
					Never Forget What
					<span class="text-primary"> Matters Most</span>
				</h1>
				<p class="mx-auto mb-8 max-w-2xl py-6 text-xl opacity-70">
					A simple, powerful reminder app that helps you stay organized and productive. Manage
					tasks, set priorities, and achieve your goals effortlessly.
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row">
					<a href={resolve('/register')} class="btn btn-primary btn-lg gap-2">
						Start for Free
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="h-5 w-5"
						>
							<line x1="5" y1="12" x2="19" y2="12"></line>
							<polyline points="12 5 19 12 12 19"></polyline>
						</svg>
					</a>
					<a href={resolve('/login')} class="btn btn-outline btn-lg"> Sign In </a>
				</div>

				<!-- Hero Mockup -->
				<div class="mt-16">
					<div class="mockup-window bg-base-300 border shadow-2xl">
						<div class="bg-base-200 flex justify-center px-8 py-12">
							<!-- Mini Dashboard Preview -->
							<div class="w-full max-w-3xl">
								<div class="stats stats-vertical lg:stats-horizontal mb-6 w-full shadow">
									<div class="stat">
										<div class="stat-figure text-primary text-3xl">📝</div>
										<div class="stat-title">Total Tasks</div>
										<div class="stat-value text-primary">12</div>
									</div>
									<div class="stat">
										<div class="stat-figure text-secondary text-3xl">⏳</div>
										<div class="stat-title">Today</div>
										<div class="stat-value text-secondary">3</div>
									</div>
									<div class="stat">
										<div class="stat-figure text-success text-3xl">✅</div>
										<div class="stat-title">Completed</div>
										<div class="stat-value text-success">8</div>
									</div>
								</div>

								<div class="space-y-3">
									<div class="alert shadow-lg">
										<div class="flex w-full items-center gap-3">
											<div class="badge badge-error badge-sm"></div>
											<span class="flex-1 text-left">Team Meeting</span>
											<span class="text-sm opacity-60">10:00 AM</span>
										</div>
									</div>
									<div class="alert shadow-lg">
										<div class="flex w-full items-center gap-3">
											<div class="badge badge-warning badge-sm"></div>
											<span class="flex-1 text-left">Lunch with Client</span>
											<span class="text-sm opacity-60">12:30 PM</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Features Section -->
	<div class="bg-base-200 py-20">
		<div class="container mx-auto px-4">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold">Everything You Need</h2>
				<p class="mx-auto max-w-2xl text-lg opacity-70">
					Simple yet powerful features to help you stay on top of your tasks
				</p>
			</div>

			<div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each features as feature (feature.title)}
					<div class="card bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
						<div class="card-body items-center text-center">
							<div class="mb-4 text-5xl">{feature.icon}</div>
							<h2 class="card-title">{feature.title}</h2>
							<p class="opacity-70">{feature.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- How It Works Section -->
	<div class="py-20">
		<div class="container mx-auto max-w-4xl px-4">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold">How It Works</h2>
				<p class="text-lg opacity-70">Get started in three simple steps</p>
			</div>

			<ul class="steps steps-vertical lg:steps-horizontal mb-12 w-full">
				<li class="step step-primary">Create Account</li>
				<li class="step step-primary">Add Reminders</li>
				<li class="step step-primary">Stay Productive</li>
			</ul>

			<div class="space-y-8">
				<div class="card bg-base-100 shadow-xl">
					<div class="card-body">
						<div class="flex items-center gap-4">
							<div class="avatar placeholder">
								<div
									class="bg-primary text-primary-content flex w-16 items-center justify-center rounded-full"
								>
									<span class="text-2xl font-bold">1</span>
								</div>
							</div>
							<div class="flex-1">
								<h3 class="card-title">Create Your Account</h3>
								<p class="opacity-70">Sign up in seconds and start organizing your life</p>
							</div>
						</div>
					</div>
				</div>

				<div class="card bg-base-100 shadow-xl">
					<div class="card-body">
						<div class="flex items-center gap-4">
							<div class="avatar placeholder">
								<div
									class="bg-secondary text-secondary-content flex w-16 items-center justify-center rounded-full"
								>
									<span class="text-2xl font-bold">2</span>
								</div>
							</div>
							<div class="flex-1">
								<h3 class="card-title">Add Your Reminders</h3>
								<p class="opacity-70">Create tasks, set priorities, and schedule notifications</p>
							</div>
						</div>
					</div>
				</div>

				<div class="card bg-base-100 shadow-xl">
					<div class="card-body">
						<div class="flex items-center gap-4">
							<div class="avatar placeholder">
								<div
									class="bg-accent text-accent-content flex w-16 items-center justify-center rounded-full"
								>
									<span class="text-2xl font-bold">3</span>
								</div>
							</div>
							<div class="flex-1">
								<h3 class="card-title">Stay Productive</h3>
								<p class="opacity-70">Get notified and complete tasks on time, every time</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- CTA Section -->
	<div class="hero from-primary to-secondary text-primary-content min-h-96 bg-linear-to-br">
		<div class="hero-content text-center">
			<div class="max-w-2xl">
				<h2 class="mb-6 text-4xl font-bold">Ready to Get Started?</h2>
				<p class="mb-8 text-xl opacity-90">
					Join thousands of users who are already staying organized and productive
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row">
					<a
						href={resolve('/register')}
						class="btn btn-lg bg-base-100 text-base-content hover:bg-base-200 border-0"
					>
						Create Free Account
					</a>
					<a
						href={resolve('/login')}
						class="btn btn-lg btn-outline border-base-100 hover:bg-base-100 hover:text-base-content border-2"
					>
						Sign In
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer
		class="footer sm:footer-horizontal text-base-content container mx-auto grid w-full grid-cols-4 items-center justify-center p-10"
	>
		<aside class="mx-auto">
			<svg
				width="50"
				height="50"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				fill-rule="evenodd"
				clip-rule="evenodd"
				class="fill-current"
			>
				<path
					d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
				></path>
			</svg>
			<p>
				ACME Industries Ltd.
				<br />
				Providing reliable tech since 1992
			</p>
		</aside>
		<ul class="mx-auto">
			<h6 class="footer-title">Services</h6>
			<li class="link link-hover">Reminders</li>
			<li class="link link-hover">Notification</li>
			<li class="link link-hover">Live Notif</li>
		</ul>
		<ul class="mx-auto">
			<h6 class="footer-title">Company</h6>
			<li class="link link-hover">About us</li>
			<li class="link link-hover">Contact</li>
			<li class="link link-hover">Jobs</li>
		</ul>
		<ul class="mx-auto">
			<h6 class="footer-title">Legal</h6>
			<li class="link link-hover">Terms of use</li>
			<li class="link link-hover">Privacy policy</li>
			<li class="link link-hover">Cookie policy</li>
		</ul>
	</footer>
</div>
