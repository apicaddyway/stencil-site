import '@stencil/router';
import { Component, Element, Listen, State } from '@stencil/core';
import SiteProviderConsumer, { SiteState } from '../../global/site-provider-consumer';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  elements = [
    'site-header',
    'site-menu',
    'app-burger',
    '.root'
  ];

  @Element() el!: HTMLElement;

  @State() isLeftSidebarIn: boolean = false;

  @Listen('window:resize')
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768 && this.isLeftSidebarIn) {
        this.isLeftSidebarIn = false;
        document.body.classList.remove('no-scroll');
        this.elements.forEach((el) => {
          this.el.querySelector(el).classList.remove('left-sidebar-in');
        });
      }
    });
  }

  componentDidLoad() {
    this.isLeftSidebarIn = false;
  }

  toggleLeftSidebar = () => {
    if (window.innerWidth >= 768) {
      return;
    }
    if (this.isLeftSidebarIn) {
      this.isLeftSidebarIn = false;
      document.body.classList.remove('no-scroll');
      this.elements.forEach((el) => {
        this.el.querySelector(el).classList.remove('left-sidebar-in');
        this.el.querySelector(el).classList.add('left-sidebar-out');
      });
    } else {
      this.isLeftSidebarIn = true;
      document.body.classList.add('no-scroll');
      this.elements.forEach((el) => {
        this.el.querySelector(el).classList.add('left-sidebar-in');
        this.el.querySelector(el).classList.remove('left-sidebar-out');
      });
    }
  }

  render() {
    const siteState: SiteState = {
      isLeftSidebarIn: this.isLeftSidebarIn,
      toggleLeftSidebar: this.toggleLeftSidebar
    };

    return (
      <SiteProviderConsumer.Provider state={siteState}>
        <site-header />
        <div class="root">
          <div class="container">
            <stencil-router scrollTopOffset={0}>
              <stencil-route-switch>
                <stencil-route url="/" component="landing-page" exact={true} />
                <stencil-route
                  url="/docs/:pageName"
                  routeRender={(props: { [key: string]: any }) => {
                    const map = {
                      'introduction': 'introduction/why-stencil',
                      'goals-and-objectives': 'introduction/goals-and-objectives',
                      'browser-support': 'introduction/browser-support',
                      'getting-started': 'introduction/getting-started',
                      'my-first-component': 'introduction/my-first-component',

                      'component-lifecycle': 'components/component-lifecycle',
                      'decorators': 'components/decorators',
                      'events': 'components/events',
                      'reactive-data': 'components/reactive-data',
                      'templating-jsx': 'components/templating-and-jsx',
                      'styling': 'components/styling',
                      'forms': 'components/forms',

                      'framework-integration': 'framework-integration/overview',
                      'angular': 'framework-integration/angular',
                      'react': 'framework-integration/react',
                      'vue': 'framework-integration/vue',
                      'ember': 'framework-integration/ember',
                      'javascript': 'framework-integration/javascript',

                      'config': 'tooling/config',
                      'dev-server': 'tooling/dev-server',
                      'prerendering': 'tooling/prerendering',
                      'typed-components': 'tooling/typed-components',
                      'docs-auto-generation': 'tooling/docs-auto-generation',
                      'build-conditionals': 'tooling/build-conditionals',
                      'plugins': 'tooling/plugins',

                      'service-workers': 'guides/service-workers',
                      'distribution': 'guides/distribution',
                      'module-bundling': 'guides/module-bundling',
                      'router': 'guides/router',
                      'state-tunnel': 'guides/state-tunnel',
                      'redux': 'guides/redux',
                      'style-guide': 'guides/style-guide',

                      'testing': 'testing/overview',
                      'unit-testing': 'testing/unit-testing',
                      'e2e-testing': 'testing/e2e-testing',
                      'screenshot-visual-diff': 'testing/screenshot-visual-diff',
                    };
                    return (
                      <document-component
                        pages={[map[props.match.params.pageName]]}
                      />
                    );
                  }}
                />
                <stencil-route url="/demos" component="demos-page" />
                <stencil-route url="/pwa" component="pwas-page" />
                <stencil-route url="/resources" component="resources-page" />

                <stencil-route component='notfound-page'></stencil-route>
              </stencil-route-switch>
            </stencil-router>
          </div>
          <footer>
            <div class="container">
              <div class="footer__open-source">
                <a
                  href="http://ionicframework.com/"
                  title="IonicFramework.com"
                  rel="noopener">
                  <img
                    src="/assets/img/ionic-os-logo.png"
                    alt="Ionic Open Source Logo" />
                </a>
                <p>
                  Released under <span id="mit">MIT License</span> | Copyright @ 2018
                </p>
              </div>

              <div class="footer__icons">
                <lazy-iframe
                  name='Github Star Count'
                  class='star-button'
                  src='https://ghbtns.com/github-btn.html?user=ionic-team&repo=stencil&type=star&count=true'
                  frameBorder='0'
                  scrolling='0'
                  width='100px'
                  height='20px'></lazy-iframe>
                <a
                  class="svg-button"
                  id="stencil-twitter"
                  href="https://twitter.com/stenciljs"
                  target="_blank"
                  rel="noopener"
                  title="Open the stencil account on twitter">
                  <app-icon name="twitter"></app-icon>
                </a>
                <a
                  class="svg-button"
                  id="ionic-forum"
                  href="https://stencil-worldwide.herokuapp.com"
                  target="_blank"
                  rel="noopener"
                  title="Join the stencil worldwide slack">
                  <app-icon name="slack"></app-icon>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </SiteProviderConsumer.Provider>
    );
  }
}
