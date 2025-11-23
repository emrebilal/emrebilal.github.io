// Tailwind Config
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                dark: '#0a0a0a',
                card: '#171717',
                accent: '#3b82f6',
            }
        }
    }
}

// GitHub Api Fetch
async function fetchGitHubProjects() {
    const username = 'emrebilal';
    const container = document.getElementById('github-projects');
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
        const repos = await response.json();
        const topRepos = repos.slice(0, 5); 
        
        let html = '';
        topRepos.forEach(repo => {
            html += `
                <a href="${repo.html_url}" target="_blank" class="block group/item p-3 hover:bg-white/5 rounded-lg transition-all border border-transparent hover:border-white/5">
                    <div class="flex justify-between items-center mb-1">
                        <span class="font-bold text-blue-400 group-hover/item:text-blue-300 truncate text-sm">${repo.name}</span>
                        <span class="text-[10px] border border-gray-700 px-1.5 py-0.5 rounded text-gray-400 bg-black/20">${repo.language || 'Code'}</span>
                    </div>
                    <p class="text-xs text-gray-500 truncate leading-relaxed">${repo.description || 'No description provided.'}</p>
                </a>
            `;
        });
        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = '<p class="text-xs text-red-400">Failed to load repositories.</p>';
    }
}
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);
