(function() {

	// constructor
	this.Modal = function() {
		this.overlay = null;
		this.modal = null;
		this.closeButton = null;
		this.transitionEnd = transitionSelect();

		var defaults = {
      		className: 'fade-and-drop',
      		closeButton: true,
      		content: "",
      		maxWidth: 600,
      		minWidth: 280,
      		overlay: true
    	}

    	if (arguments[0] && typeof arguments[0] === 'object') {
    		this.options = extendDefaults(defaults, arguments[0]);
    	}
	}

	// public functions
	Modal.prototype.open = function() {

		// Build the modal
		buildOut.call(this);

		// Initialize the event listeners
		initializeEvents.call(this);

		window.getComputedStyle(this.modal).height;

		// Check if the modal is taller than the window. Add anchor class if it is.
		this.modal.className = this.modal.className +
			(this.modal.offsetHeight > window.innerHeight ? ' des-open des-anchored': ' des-open');
		this.overlay.className = this.overlay.className + ' des-open';
	}

	Modal.prototype.close = function() {
		var _ = this;

		// Remove the open class name
		this.modal.className = this.modal.className.replace(' des-open', '');
		this.overlay.className = this.overlay.className.replace(' des-open', '');

		// Remove nodes from DOM after CSS transition event
		this.modal.addEventListener(this.transitionEnd, function() {
			_.modal.parentNode.removeChild(_.modal);
		});
		this.overlay.addEventListener(this.transitionEnd, function() {
			if (_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
		});

	}

	function transitionSelect() {
		var el = document.createElement('div');
		if (el.style.WebkitTransition) return "webkitTransitionEnd";
		if (el.style.OTransition) return "oTransitionEnd";
		return 'transitionend';
	}

	// private functions
	function extendDefaults(source, properties) {
		var property;
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	}

	function buildOut() {
		var content, contentHolder, docFrag;

		// check if content is an HTML string or a dom node
		if (typeof this.options.content === 'string') {
			content = this.options.content;
		} else {
			content = this.options.content.innerHTML;
		}

		docFrag = document.createDocumentFragment();

		// modal element
		this.modal = document.createElement('div');
		this.modal.className = 'des-modal ' + this.options.className;
		this.modal.style.minWidth = this.options.minWidth + 'px';
		this.modal.style.maxWidth = this.options.maxWidth + 'px';

		// If close button option is true, add a close button
		if (this.options.closeButton === true) {
			this.closeButton = document.createElement('button');
			this.closeButton.className = 'des-close close-button';
			this.closeButton.innerHTML = 'x';
			this.modal.appendChild(this.closeButton);
		}

		// If overlay is true, add an overlay
		if (this.options.overlay === true) {
			this.overlay = document.createElement('div');
			this.overlay.className = 'des-overlay ' + this.options.className;
			docFrag.appendChild(this.overlay);
		}

		// Create content area and append to modal
		contentHolder = document.createElement('div');
		contentHolder.className = 'des-content';
		contentHolder.innerHTML = content;
		this.modal.appendChild(contentHolder);

		// append the modal to the document fragment
		docFrag.appendChild(this.modal);

		// Append the docfrag to the doc body
		document.body.appendChild(docFrag);
	}

	function initializeEvents() {
		if (this.closeButton) {
			this.closeButton.addEventListener('click', this.close.bind(this));
		}

		if (this.overlay) {
			this.overlay.addEventListener('click', this.close.bind(this));
		}
	}

})();