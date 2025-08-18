document.addEventListener("DOMContentLoaded", () => {
    /* =======================
     *     CANVAS: PARTÍCULAS
     *  ======================= */
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");

    function sizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    sizeCanvas();
    window.addEventListener("resize", () => {
        sizeCanvas();
        initParticles();
    });

    let particlesArray = [];
    const numParticles = 100;

    // mouse
    const mouse = { x: null, y: null };
    window.addEventListener("mousemove", e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor(x, y, size, color, speedX, speedY) {
            this.x = x; this.y = y;
            this.size = size; this.color = color;
            this.speedX = speedX; this.speedY = speedY;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // bordas
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // atração leve ao mouse
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 100) {
                this.x += dx / 10;
                this.y += dy / 10;
            }
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numParticles; i++) {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const color = "rgba(248, 250, 250, 0.8)";
            const speedX = (Math.random() - 0.5) * 1.5;
            const speedY = (Math.random() - 0.5) * 1.5;
            particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
        }
    }

    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 120) {
                    ctx.strokeStyle = "rgba(248, 250, 250, 0.2)";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => p.update());
        connectParticles();
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    /* =======================
     *     MODAL: SISTEMA ÚNICO
     *     (usa #modal-overlay / #modal-body / .modal-close)
     *  ======================= */
    const modalOverlay = document.getElementById("modal-overlay");
    const modalBody = document.getElementById("modal-body");
    const modalClose = document.querySelector(".modal-close");

    function openModalHTML(html) {
        modalBody.innerHTML = html;
        modalOverlay.classList.add("active");
        modalOverlay.setAttribute("aria-hidden", "false");
    }

    function closeModal() {
        modalOverlay.classList.remove("active");
        modalOverlay.setAttribute("aria-hidden", "true");
        modalBody.innerHTML = "";
    }

    // fechar modal
    if (modalClose) modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });

        const modalTemplates = {
            "servicos": `
            <div class="modal-layout">
            <div class="modal-text">
            <div class="modal-layout">
            <div class="modal-text">
            <div class="services-grid">
            <div class="service-item">
            <img src="https://img.icons8.com/ios-filled/50/FFFFFF/laptop-coding.png" alt="Desenvolvimento Web">
            <h3>Desenvolvimento Web</h3>
            <p>Criação e manutenção de sites modernos, responsivos e sob medida para destacar sua presença online.</p>
            </div>

            <div class="service-item">
            <img src="https://img.icons8.com/ios/50/FFFFFF/services--v1.png" alt="Suporte Técnico">
            <h3>Suporte Técnico</h3>
            <p>Atendimento remoto e presencial para resolução de problemas em computadores, sistemas e periféricos.</p>
            </div>

            <div class="service-item">
            <img src="https://img.icons8.com/ios-filled/50/FFFFFF/wifi--v1.png" alt="Redes">
            <h3>Redes Wi-Fi</h3>
            <p>Configuração e otimização de redes domésticas e corporativas para maior estabilidade e segurança.</p>
            </div>
            </div>

            <p style="text-align:center; margin-top:30px;">
            <img src="https://img.icons8.com/ios/30/FFFFFF/google-maps-new--v1.png"
            alt="Localização" style="vertical-align:middle; margin-right:8px;">
            Atendimentos presenciais em São Paulo e Região.
            </p>
            </div>
            </div>
            </div>
            </div>
            `,
            "sobre-mim": `
            <div class="modal-layout">
            <div class="modal-text">
            <p>Prazer, eu sou o <strong>Vinícius</strong>! 👋<br>
            Sou um entusiasta de TI iniciando minha carreira como freelance.<br><br>
            Sempre fui muito curioso com tecnologia e hoje trabalho com <strong>Suporte em TI e Desenvolvimento web</strong> e futuramente espero começar a atuar com soluções de <strong>Cibersegurança</strong> também, sempre com o objetivo de criar soluções úteis e acessíveis.<br><br>
            Então se você procura um profissional que una<strong> técnica, criatividade e vontade de aprender</strong>, temos muito a conversar, então não se acanhe e me chame para uma boa xicara de café. ☕<br><br>
            Para mais informações, acesse meu curriculo e certificações do Credly nos botões abaixo.</p>

            <div class="modal-buttons">
            <a href="https://www.credly.com/users/vinicius-moreira.877c8d0f/badges#credly" target="_blank" class="btn-credly">
            <img src="https://img.icons8.com/small/64/FFFFFF/credly.png" alt="Credly"> Credly
            </a>
            <a href="asseats/curriculo_vinicius.pdf" download class="btn-curriculo">
            <img src="https://img.icons8.com/ios/50/FFFFFF/google-docs.png" alt="Currículo"> Currículo
            </a>
            </div>
            </div>
            </div>
            `,
            "projetos": `
            <div class="modal-layout" style="text-align:center;">
            <img src="https://f7-engenharia.com/wp-content/uploads/2025/01/construcao.gif"
            alt="Em construção" style="max-width:100%; margin:20px auto; display:block;">
            <p>🚧 Essa seção está em obras! Em breve você verá meus projetos publicados aqui.</p>
            </div>
            `
        };

        /* =======================
         *     LIGAÇÃO DOS CARDS
         *     (funciona por data-modal OU por id específico)
         *  ======================= */

        // 1) Qualquer card com data-modal="servicos" | "sobre-mim" | "projetos"
        document.querySelectorAll("[data-modal]").forEach(card => {
            card.addEventListener("click", () => {
                const type = card.dataset.modal;
                const html = modalTemplates[type];
                if (html) openModalHTML(html);
            });
        });

        // 2) Compatibilidade com ids antigos (se existirem)
        const cardServ = document.getElementById("card-servicos");
        if (cardServ) cardServ.addEventListener("click", () => openModalHTML(modalTemplates["servicos"]));

        const cardSobre = document.getElementById("card-sobre");
    if (cardSobre) cardSobre.addEventListener("click", () => openModalHTML(modalTemplates["sobre-mim"]));
});

