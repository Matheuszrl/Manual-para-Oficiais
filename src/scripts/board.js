document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            const tabGroup = tab.getAttribute('tab-group');
            
            tabs.forEach(
                t => {
                    if (t.getAttribute('tab-group') == tabGroup){
                        t.classList.remove('active')
                    }
                }                
            );
            contents.forEach(
                c => {
                    if (c.getAttribute('tab-group') == tabGroup){
                        c.classList.remove('active')
                    }
                }             
            );
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

document.querySelectorAll('.expand-button').forEach(button => {
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true' || false;
        button.setAttribute('aria-expanded', !expanded);
        const content = document.getElementById(button.getAttribute('aria-controls'));
        content.classList.toggle('open');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os elementos necessários
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('zoomedImage');
    const closeButton = document.querySelector('.close-button');
    const zoomableImages = document.querySelectorAll('.zoomable-image img');

    // Adiciona evento de clique para cada imagem
    zoomableImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
    });

    // Fecha o modal ao clicar no X
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Fecha o modal ao clicar fora da imagem
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Fecha o modal com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
});