'use client';
// Recovered public React view code, reformatted from the client's deployed bundle.
// Legacy backend and browser-password authentication have been removed.
import * as x from 'react';
import * as runtime from 'react/jsx-runtime';
import { translated } from './content-store';
import ContentEditor from './content-editor';
import { saveField } from './save-field';
const propsFor = (props) =>
  props
    ? {
        ...props,
        children: translated(props.children),
        ...(props.src ? { src: translated(props.src) } : {}),
      }
    : props;
const f = {
  ...runtime,
  jsx: (type, props, key) => runtime.jsx(type, propsFor(props), key),
  jsxs: (type, props, key) => runtime.jsxs(type, propsFor(props), key),
};
import { ye } from './data-client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
const bt = ({ to, children, ...p }) => f.jsx('a', { href: to, ...p, children });
const ba = bt;
const wn = () => null;
const Z0 = ({ children }) => {
  const p = typeof window === 'undefined' ? '/' : window.location.pathname;
  return (
    x.Children.toArray(children).find((c) => c.props.path === p)?.props
      .element || f.jsx('main', { children: 'Page not found' })
  );
};
const Tw = ({ open, index, close, slides, render }) =>
  f.jsx(Dialog, {
    open,
    onOpenChange: (v) => !v && close(),
    children: f.jsxs(DialogContent, {
      style: { maxWidth: '90vw', background: '#111' },
      children: [
        f.jsx(DialogTitle, { children: slides[index]?.title || 'Gallery' }),
        render.slide({ slide: slides[index] }),
      ],
    }),
  });
const Dg = '/assets/logo1-BDcs8sUA.jpg';
const h_ = () =>
  f.jsxs('header', {
    className: 'navbar',
    children: [
      f.jsxs(bt, {
        to: '/',
        className: 'navbar-brand',
        children: [
          f.jsx('img', {
            src: Dg,
            alt: 'Seibab Kennel Logo',
            className: 'navbar-logo',
          }),
          f.jsxs('div', {
            children: [
              f.jsx('h1', { children: 'Seibab Kennel' }),
              f.jsx('p', { children: 'Extreme / XL American Bullies' }),
            ],
          }),
        ],
      }),
      f.jsxs('nav', {
        className: 'nav-menu',
        children: [
          f.jsx(ba, { to: '/', className: 'nav-link', children: 'Home' }),
          f.jsx(ba, {
            to: '/whats-new',
            className: 'nav-link',
            children: "What's New",
          }),
          f.jsx(ba, {
            to: '/available-puppies',
            className: 'nav-link',
            children: 'Available Puppies',
          }),
          f.jsx(ba, { to: '/studs', className: 'nav-link', children: 'Studs' }),
          f.jsx(ba, {
            to: '/puppy-info',
            className: 'nav-link',
            children: 'Puppy Info',
          }),
          f.jsx(ba, {
            to: '/reviews',
            className: 'nav-link',
            children: 'Reviews',
          }),
          f.jsx(ba, { to: '/about', className: 'nav-link', children: 'About' }),
          f.jsx(ba, {
            to: '/contact',
            className: 'nav-contact-button',
            children: 'Contact Us',
          }),
        ],
      }),
    ],
  });
const Sd = () => {
  const [a, n] = x.useState([]),
    [s, r] = x.useState(0),
    [o, c] = x.useState({
      name: '',
      email: '',
      rating: 5,
      review: '',
      imageFile: null,
    });
  (x.useEffect(() => {
    d();
  }, []),
    x.useEffect(() => {
      if (a.length <= 1) return;
      const y = setInterval(() => {
        r((_) => (_ + 1) % a.length);
      }, 5e3);
      return () => clearInterval(y);
    }, [a]));
  const d = async () => {
      const { data: y, error: _ } = await ye
        .from('Reviews')
        .select('*')
        .eq('rating', 5)
        .eq('approved', !0)
        .order('created_at', { ascending: !1 })
        .limit(10);
      _ || n(y || []);
    },
    p = async (y) => {
      if (!y) return null;
      const _ = y.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, ''),
        S = `reviews/${Date.now()}-${_}`,
        { data: j, error: E } = await ye.storage
          .from('kennel-images')
          .upload(S, y, {
            cacheControl: '3600',
            upsert: !1,
            contentType: y.type,
          });
      if (E) return (alert(`Image upload failed: ${E.message}`), null);
      const { data: O } = ye.storage.from('kennel-images').getPublicUrl(j.path);
      return O.publicUrl;
    },
    m = async (y) => {
      y.preventDefault();
      const _ = Number(o.rating),
        S = _ === 5,
        j = await p(o.imageFile),
        { error: E } = await ye.from('Reviews').insert([
          {
            name: o.name,
            email: o.email,
            rating: _,
            review: o.review,
            image_url: j,
            approved: S,
          },
        ]);
      if (E) {
        alert('Review failed to submit.');
        return;
      }
      (S
        ? (alert('Thank you! Your review was sent to the owner for approval.'),
          d())
        : alert('Thank you for your feedback. The owner will review it.'),
        c({ name: '', email: '', rating: 5, review: '', imageFile: null }),
        y.target.reset());
    },
    g = a[s];
  return f.jsxs('section', {
    className: 'reviews-section',
    children: [
      f.jsxs('div', {
        className: 'reviews-header',
        children: [
          f.jsx('p', { className: 'eyebrow', children: 'Customer Reviews' }),
          f.jsx('h2', { children: 'What Families Are Saying' }),
          f.jsx('p', {
            children:
              'Leave a review for Seibab Kennel. Reviews are checked by the owner before being published.',
          }),
        ],
      }),
      g &&
        f.jsxs(f.Fragment, {
          children: [
            f.jsxs('div', {
              className: 'review-showcase',
              children: [
                f.jsxs('div', {
                  className: 'review-showcase-content',
                  children: [
                    f.jsx('div', { className: 'stars', children: '★★★★★' }),
                    f.jsxs('p', {
                      className: 'review-quote',
                      children: ['“', g.review, '”'],
                    }),
                    f.jsx('h4', { children: g.name }),
                  ],
                }),
                g.image_url &&
                  f.jsx('div', {
                    className: 'review-showcase-image',
                    children: f.jsx('img', { src: g.image_url, alt: g.name }),
                  }),
              ],
            }),
            a.length > 1 &&
              f.jsx('div', {
                className: 'review-dots',
                children: a.map((y, _) =>
                  f.jsx(
                    'button',
                    {
                      type: 'button',
                      className: s === _ ? 'active' : '',
                      onClick: () => r(_),
                    },
                    y.id,
                  ),
                ),
              }),
          ],
        }),
      f.jsxs('form', {
        className: 'review-form',
        onSubmit: m,
        children: [
          f.jsx('h3', { children: 'Leave a Review' }),
          f.jsxs('div', {
            className: 'review-form-grid',
            children: [
              f.jsx('input', {
                type: 'text',
                placeholder: 'Your Name',
                value: o.name,
                onChange: (y) => c({ ...o, name: y.target.value }),
                required: !0,
              }),
              f.jsx('input', {
                type: 'email',
                placeholder: 'Your Email',
                value: o.email,
                onChange: (y) => c({ ...o, email: y.target.value }),
                required: !0,
              }),
            ],
          }),
          f.jsxs('select', {
            value: o.rating,
            onChange: (y) => c({ ...o, rating: y.target.value }),
            children: [
              f.jsx('option', { value: '5', children: '★★★★★ 5 Stars' }),
              f.jsx('option', { value: '4', children: '★★★★☆ 4 Stars' }),
              f.jsx('option', { value: '3', children: '★★★☆☆ 3 Stars' }),
              f.jsx('option', { value: '2', children: '★★☆☆☆ 2 Stars' }),
              f.jsx('option', { value: '1', children: '★☆☆☆☆ 1 Star' }),
            ],
          }),
          f.jsx('textarea', {
            placeholder: 'Write your review...',
            value: o.review,
            onChange: (y) => c({ ...o, review: y.target.value }),
            required: !0,
          }),
          f.jsxs('label', {
            className: 'review-upload-box',
            children: [
              f.jsx('span', { children: 'Upload a photo optional' }),
              f.jsx('small', { children: 'Show off your puppy or stud!' }),
              f.jsx('input', {
                type: 'file',
                accept: 'image/*',
                onChange: (y) => c({ ...o, imageFile: y.target.files[0] }),
              }),
            ],
          }),
          f.jsx('button', { type: 'submit', children: 'Submit Review' }),
        ],
      }),
    ],
  });
};
function OE() {
  const [a, n] = x.useState([]),
    [s, r] = x.useState(0);
  (x.useEffect(() => {
    o();
  }, []),
    x.useEffect(() => {
      if (a.length <= 1) return;
      const d = setInterval(() => {
        r((p) => (p + 1) % a.length);
      }, 4500);
      return () => clearInterval(d);
    }, [a]));
  const o = async () => {
    const { data: d, error: p } = await ye
      .from('WhatsNew')
      .select('*')
      .eq('active', !0)
      .order('featured', { ascending: !1 })
      .order('created_at', { ascending: !1 })
      .limit(5);
    p || n(d || []);
  };
  if (a.length === 0) return null;
  const c = a[s];
  return f.jsxs('section', {
    className: 'whats-new-preview',
    children: [
      f.jsxs('div', {
        className: 'preview-alert-bar',
        children: [
          f.jsx('span', { className: 'preview-live-dot' }),
          f.jsx('p', { children: 'Latest Kennel Update' }),
        ],
      }),
      f.jsxs('div', {
        className: 'preview-card',
        children: [
          c.image_url &&
            f.jsx('div', {
              className: 'preview-image',
              children: f.jsx('img', { src: c.image_url, alt: c.title }),
            }),
          f.jsxs('div', {
            className: 'preview-content',
            children: [
              f.jsx('span', { children: c.tag }),
              f.jsx('h2', { children: c.title }),
              f.jsx('p', { children: c.description }),
              f.jsx(bt, {
                to: '/whats-new',
                className: 'preview-button',
                children: 'View What’s New',
              }),
            ],
          }),
        ],
      }),
      a.length > 1 &&
        f.jsx('div', {
          className: 'preview-dots',
          children: a.map((d, p) =>
            f.jsx(
              'button',
              {
                type: 'button',
                className: s === p ? 'active' : '',
                onClick: () => r(p),
              },
              d.id,
            ),
          ),
        }),
    ],
  });
}
const Bv = '/assets/SK1-bJb3q5Et.mp4',
  NE = '/assets/dog1-BnooSC2S.png',
  CE = '/assets/dog2-aGY4b_qt.png',
  kE = '/assets/dog3-DrSctZIJ.png',
  UE = '/assets/dog4-CimmZFWE.jpg',
  DE = '/assets/seibab_dog-Cf47a7Cc.jpg',
  LE = '/assets/seibab_dog2-DRUpwLpA.jpg',
  ME = '/assets/seibab_dog3-AlurKDNl.jpg',
  BE = '/assets/seibab_dog4-BuZKqFuc.jpg',
  yg = [
    { type: 'video', src: Bv, title: 'Seibab Kennel Walk' },
    { type: 'image', src: NE, title: 'XL Bully' },
    { type: 'image', src: CE, title: 'XL Bully' },
    { type: 'image', src: kE, title: 'XL Bully' },
    { type: 'image', src: UE, title: 'XL Bully' },
    { type: 'image', src: DE, title: 'XL Bully' },
    { type: 'image', src: LE, title: 'XL Bully' },
    { type: 'image', src: ME, title: 'XL Bully' },
    { type: 'image', src: BE, title: 'XL Bully' },
  ];
function Ji({
  children: a,
  className: n = '',
  as: s = 'section',
  delay: r = 0,
}) {
  const o = x.useRef(null),
    [c, d] = x.useState(!1);
  return (
    x.useEffect(() => {
      const p = o.current;
      if (!p) return;
      const m = () => {
        const g = p.getBoundingClientRect(),
          y = window.innerHeight;
        g.top < y - 120 && (d(!0), window.removeEventListener('scroll', m));
      };
      return (
        m(),
        window.addEventListener('scroll', m),
        window.addEventListener('resize', m),
        () => {
          (window.removeEventListener('scroll', m),
            window.removeEventListener('resize', m));
        }
      );
    }, []),
    f.jsx(s, {
      ref: o,
      className: n,
      style: {
        opacity: c ? 1 : 0,
        transform: c
          ? 'translateY(0px) scale(1)'
          : 'translateY(90px) scale(0.96)',
        filter: c ? 'blur(0px)' : 'blur(14px)',
        transition: `opacity 1000ms ease ${r}ms, transform 1000ms ease ${r}ms, filter 1000ms ease ${r}ms`,
        willChange: 'opacity, transform, filter',
      },
      children: a,
    })
  );
}
function zE() {
  const [a, n] = x.useState(-1),
    s = yg.map((r) => ({ type: r.type, src: r.src, title: r.title }));
  return f.jsxs('main', {
    className: 'home',
    children: [
      f.jsx(Ji, { as: 'div', children: f.jsx(OE, {}) }),
      f.jsxs(Ji, {
        className: 'hero-section',
        delay: 100,
        children: [
          f.jsxs('div', {
            className: 'hero-content',
            children: [
              f.jsx('p', {
                className: 'eyebrow',
                children: 'Elite XL American Bullies',
              }),
              f.jsxs('h1', {
                children: [
                  'Welcome to ',
                  f.jsx('span', { children: 'Seibab Kennel' }),
                ],
              }),
              f.jsx('p', {
                className: 'hero-description',
                children:
                  'Discover our elite breeding program where health, temperament, and championship bloodlines come together to raise confident, loyal, and family-ready companions.',
              }),
              f.jsxs('div', {
                className: 'hero-buttons',
                children: [
                  f.jsx(bt, {
                    to: '/available-puppies',
                    className: 'primary-button',
                    children: 'Browse Available Puppies',
                  }),
                  f.jsx(bt, {
                    to: '/about',
                    className: 'secondary-button',
                    children: 'Learn About Us',
                  }),
                ],
              }),
            ],
          }),
          f.jsxs('div', {
            className: 'hero-video-card',
            onClick: () => n(0),
            children: [
              f.jsx('video', {
                className: 'hero-video',
                src: Bv,
                autoPlay: !0,
                loop: !0,
                muted: !0,
                playsInline: !0,
              }),
              f.jsx('div', {
                className: 'video-badge',
                children: 'Watch Preview',
              }),
            ],
          }),
        ],
      }),
      f.jsxs(Ji, {
        className: 'trust-section',
        children: [
          f.jsxs('div', {
            className: 'trust-card',
            children: [
              f.jsx('h3', { children: 'Health Focused' }),
              f.jsx('p', {
                children:
                  'Raised with care, structure, and attention to wellness.',
              }),
            ],
          }),
          f.jsxs('div', {
            className: 'trust-card',
            children: [
              f.jsx('h3', { children: 'Family Temperament' }),
              f.jsx('p', {
                children: 'Confident, loyal, and socialized for loving homes.',
              }),
            ],
          }),
          f.jsxs('div', {
            className: 'trust-card',
            children: [
              f.jsx('h3', { children: 'Quality Bloodlines' }),
              f.jsx('p', {
                children:
                  'Built around strong structure, presence, and breed standards.',
              }),
            ],
          }),
        ],
      }),
      f.jsxs(Ji, {
        className: 'gallery-section',
        children: [
          f.jsxs('div', {
            className: 'section-heading',
            children: [
              f.jsx('p', { className: 'eyebrow', children: 'Our Gallery' }),
              f.jsx('h2', { children: 'Meet the Seibab Look' }),
              f.jsx('p', {
                children:
                  'View our dogs and get a closer look at the strength, structure, and confidence behind our kennel.',
              }),
            ],
          }),
          f.jsx('div', {
            className: 'home-gallery',
            children: yg.slice(1).map((r, o) =>
              f.jsx(
                'button',
                {
                  className: 'thumb',
                  onClick: () => n(o + 1),
                  children: f.jsx('img', { src: r.src, alt: r.title }),
                },
                o + 1,
              ),
            ),
          }),
        ],
      }),
      f.jsxs(Ji, {
        className: 'cta-section',
        children: [
          f.jsx('h2', { children: 'Ready to find your next companion?' }),
          f.jsx('p', {
            children:
              'Browse our available puppies or contact us to learn more about upcoming litters.',
          }),
          f.jsx(bt, {
            to: '/available-puppies',
            className: 'primary-button',
            children: 'Browse Puppies',
          }),
        ],
      }),
      f.jsx(Ji, { as: 'div', children: f.jsx(Sd, {}) }),
      a >= 0 &&
        f.jsx(Tw, {
          open: !0,
          index: a,
          close: () => n(-1),
          slides: s,
          render: {
            slide: ({ slide: r }) =>
              r.type === 'video'
                ? f.jsx('video', {
                    src: r.src,
                    controls: !0,
                    autoPlay: !0,
                    style: { maxWidth: '100%', maxHeight: '100%' },
                  })
                : f.jsx('img', {
                    src: r.src,
                    alt: r.title,
                    style: { maxWidth: '100%', maxHeight: '100%' },
                  }),
          },
        }),
    ],
  });
}
function PE() {
  const [a, n] = x.useState([]);
  x.useEffect(() => {
    s();
  }, []);
  const s = async () => {
    const { data: r, error: o } = await ye
      .from('UpcomingBreedings')
      .select('*')
      .eq('active', !0)
      .order('featured', { ascending: !1 })
      .order('created_at', { ascending: !1 });
    o || n(r || []);
  };
  return a.length === 0
    ? null
    : f.jsxs('section', {
        className: 'upcoming-breedings-section',
        children: [
          f.jsxs('div', {
            className: 'upcoming-breedings-header',
            children: [
              f.jsxs('div', {
                children: [
                  f.jsx('p', {
                    className: 'eyebrow',
                    children: 'Upcoming Breedings',
                  }),
                  f.jsx('h2', {
                    children: 'Future Litters & Waitlist Updates',
                  }),
                ],
              }),
              f.jsx('p', {
                children:
                  'View planned breedings and upcoming litters before puppies become available.',
              }),
            ],
          }),
          f.jsx('div', {
            className: 'upcoming-breedings-list',
            children: a.map((r) =>
              f.jsxs(
                'article',
                {
                  className: `upcoming-breeding-card ${r.featured ? 'featured-breeding-card' : ''}`,
                  children: [
                    r.image_url &&
                      f.jsxs('div', {
                        className: 'upcoming-breeding-image',
                        children: [
                          f.jsx('img', { src: r.image_url, alt: r.title }),
                          r.featured &&
                            f.jsx('span', {
                              className: 'upcoming-featured-badge',
                              children: 'Featured',
                            }),
                        ],
                      }),
                    f.jsxs('div', {
                      className: 'upcoming-breeding-content',
                      children: [
                        f.jsx('span', {
                          className: 'upcoming-status-pill',
                          children: r.status || 'Upcoming',
                        }),
                        f.jsx('h3', { children: r.title }),
                        (r.sire || r.dam) &&
                          f.jsxs('div', {
                            className: 'upcoming-parent-grid',
                            children: [
                              r.sire &&
                                f.jsxs('div', {
                                  className: 'upcoming-parent-card',
                                  children: [
                                    r.sire_image_url &&
                                      f.jsx('img', {
                                        src: r.sire_image_url,
                                        alt: r.sire,
                                      }),
                                    f.jsx('span', { children: 'Sire' }),
                                    f.jsx('strong', { children: r.sire }),
                                  ],
                                }),
                              r.dam &&
                                f.jsxs('div', {
                                  className: 'upcoming-parent-card',
                                  children: [
                                    r.dam_image_url &&
                                      f.jsx('img', {
                                        src: r.dam_image_url,
                                        alt: r.dam,
                                      }),
                                    f.jsx('span', { children: 'Dam' }),
                                    f.jsx('strong', { children: r.dam }),
                                  ],
                                }),
                            ],
                          }),
                        f.jsx('div', {
                          className: 'upcoming-breeding-details',
                          children:
                            r.expected_date &&
                            f.jsxs('p', {
                              children: [
                                f.jsx('strong', { children: 'Expected:' }),
                                ' ',
                                r.expected_date,
                              ],
                            }),
                        }),
                        f.jsx('p', {
                          className: 'upcoming-breeding-description',
                          children: r.description,
                        }),
                        f.jsxs('div', {
                          className: 'upcoming-breeding-actions',
                          children: [
                            f.jsx(bt, {
                              to: '/contact',
                              className: 'primary-button',
                              children: 'Contact About This Breeding',
                            }),
                            f.jsx(bt, {
                              to: '/whats-new',
                              className: 'secondary-button',
                              children: 'View Kennel Updates',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                },
                r.id,
              ),
            ),
          }),
        ],
      });
}
function qE() {
  const [a, n] = x.useState(null),
    [s, r] = x.useState(''),
    [o, c] = x.useState([]),
    [d, p] = x.useState({ name: '', email: '', phone: '', message: '' });
  x.useEffect(() => {
    m();
  }, []);
  const m = async () => {
      const { data: E, error: O } = await ye
        .from('Puppies')
        .select('*')
        .order('featured', { ascending: !1 })
        .order('id', { ascending: !1 });
      O || c(E || []);
    },
    g = async (E) => {
      (n(E),
        r(E.image_url),
        await ye.from('Analytics').insert([
          {
            item_type: 'puppy',
            item_id: E.id,
            item_name: E.name,
            action: 'view',
          },
        ]));
    },
    y = () => {
      (n(null), r(''), p({ name: '', email: '', phone: '', message: '' }));
    },
    _ = async (E) => {
      E.preventDefault();
      const O = `
PUPPY INTEREST

Interested Puppy: ${a.name}
Status: ${a.status}
Gender: ${a.gender}
Price: ${a.price}

Customer Phone: ${d.phone || 'Not provided'}

Customer Message:
${d.message}
    `,
        { error: M } = await ye
          .from('Messages')
          .insert([
            { name: d.name, email: d.email, message: O, status: 'New' },
          ]);
      if (M) {
        alert('Interest message failed to send.');
        return;
      }
      (await ye.from('Analytics').insert([
        {
          item_type: 'puppy',
          item_id: a.id,
          item_name: a.name,
          action: 'inquiry',
        },
      ]),
        alert('Your interest was sent successfully!'),
        y());
    },
    S = o.filter((E) => !E.sold),
    j = o.filter((E) => E.sold);
  return f.jsxs('main', {
    className: 'available-page',
    children: [
      f.jsxs('section', {
        className: 'available-hero',
        children: [
          f.jsx('p', { className: 'eyebrow', children: 'Available Puppies' }),
          f.jsx('h1', { children: 'Find Your Next XL Bully' }),
          f.jsx('p', {
            children:
              'Browse current puppies, upcoming breedings, and past placements.',
          }),
        ],
      }),
      f.jsx(PE, {}),
      f.jsxs('section', {
        className: 'available-section-shell',
        children: [
          f.jsxs('div', {
            className: 'available-section-top',
            children: [
              f.jsxs('div', {
                children: [
                  f.jsx('p', {
                    className: 'eyebrow',
                    children: 'Available Now',
                  }),
                  f.jsx('h2', { children: 'Current Puppies' }),
                ],
              }),
              f.jsx('p', {
                children:
                  'Click any puppy to view more photos, pedigree information, and send an interest message directly to the owner.',
              }),
            ],
          }),
          f.jsx('div', {
            className: 'available-section-inner',
            children:
              S.length === 0
                ? f.jsxs('section', {
                    className: 'no-puppies-box',
                    children: [
                      f.jsx('h3', { children: 'No puppies listed right now' }),
                      f.jsx('p', {
                        children:
                          'Please check back soon or contact us about upcoming litters.',
                      }),
                    ],
                  })
                : f.jsx('section', {
                    className: 'puppy-grid',
                    children: S.map((E) =>
                      f.jsxs(
                        'button',
                        {
                          className: 'puppy-card',
                          onClick: () => g(E),
                          children: [
                            f.jsxs('div', {
                              className: 'puppy-image-wrap',
                              children: [
                                f.jsx('img', { src: E.image_url, alt: E.name }),
                                E.featured &&
                                  f.jsx('span', {
                                    className: 'featured-badge',
                                    children: 'Featured',
                                  }),
                              ],
                            }),
                            f.jsxs('div', {
                              className: 'puppy-card-content',
                              children: [
                                f.jsx('span', {
                                  className: 'status-label',
                                  children: E.status,
                                }),
                                f.jsx('h3', { children: E.name }),
                                f.jsx('p', {
                                  className: 'puppy-gender',
                                  children: E.gender,
                                }),
                                f.jsx('p', {
                                  className: 'puppy-desc',
                                  children: E.description,
                                }),
                                f.jsx('p', {
                                  className: 'puppy-price',
                                  children: E.price,
                                }),
                              ],
                            }),
                          ],
                        },
                        E.id,
                      ),
                    ),
                  }),
          }),
        ],
      }),
      j.length > 0 &&
        f.jsxs('section', {
          className: 'available-section-shell sold-gallery-section',
          children: [
            f.jsxs('div', {
              className: 'available-section-top',
              children: [
                f.jsxs('div', {
                  children: [
                    f.jsx('p', {
                      className: 'eyebrow',
                      children: 'Past Puppies',
                    }),
                    f.jsx('h2', { children: 'Sold Puppy Gallery' }),
                  ],
                }),
                f.jsx('p', {
                  children:
                    'A clean look at puppies that have already found their new homes.',
                }),
              ],
            }),
            f.jsx('div', {
              className: 'available-section-inner',
              children: f.jsx('section', {
                className: 'puppy-grid',
                children: j.map((E) =>
                  f.jsxs(
                    'button',
                    {
                      className: 'puppy-card sold-card',
                      onClick: () => g(E),
                      children: [
                        f.jsxs('div', {
                          className: 'puppy-image-wrap',
                          children: [
                            f.jsx('img', { src: E.image_url, alt: E.name }),
                            f.jsx('span', {
                              className: 'sold-badge',
                              children: 'Sold',
                            }),
                          ],
                        }),
                        f.jsxs('div', {
                          className: 'puppy-card-content',
                          children: [
                            f.jsx('h3', { children: E.name }),
                            f.jsx('p', {
                              className: 'puppy-gender',
                              children: E.gender,
                            }),
                            f.jsx('p', {
                              className: 'puppy-desc',
                              children: E.description,
                            }),
                          ],
                        }),
                      ],
                    },
                    E.id,
                  ),
                ),
              }),
            }),
          ],
        }),
      a &&
        f.jsx('div', {
          className: 'modal-overlay',
          onClick: y,
          children: f.jsxs('div', {
            className: 'modal-content interest-modal',
            onClick: (E) => E.stopPropagation(),
            children: [
              f.jsx('button', {
                className: 'modal-close',
                onClick: y,
                children: '×',
              }),
              f.jsxs('div', {
                className: 'interest-modal-grid',
                children: [
                  f.jsx('div', {
                    className: 'interest-image-panel',
                    children: f.jsxs('div', {
                      className: 'puppy-modal-images',
                      children: [
                        f.jsx('img', { src: s, alt: a.name }),
                        f.jsx('div', {
                          className: 'puppy-thumb-row',
                          children: [
                            a.image_url,
                            ...(a.gallery_urls || []),
                          ].map((E) =>
                            f.jsx(
                              'button',
                              {
                                type: 'button',
                                className: s === E ? 'active' : '',
                                onClick: () => r(E),
                                children: f.jsx('img', {
                                  src: E,
                                  alt: 'Puppy thumbnail',
                                }),
                              },
                              E,
                            ),
                          ),
                        }),
                      ],
                    }),
                  }),
                  f.jsxs('div', {
                    className: 'interest-details-panel',
                    children: [
                      f.jsxs('div', {
                        className: 'modal-badge-row',
                        children: [
                          f.jsx('span', {
                            className: 'status-label modal-status',
                            children: a.sold ? 'Sold' : a.status,
                          }),
                          a.featured &&
                            f.jsx('span', {
                              className: 'featured-pill',
                              children: 'Featured Puppy',
                            }),
                        ],
                      }),
                      f.jsx('h3', { children: a.name }),
                      f.jsxs('div', {
                        className: 'puppy-detail-list',
                        children: [
                          f.jsxs('p', {
                            children: [
                              f.jsx('strong', { children: 'Gender:' }),
                              ' ',
                              a.gender,
                            ],
                          }),
                          f.jsxs('p', {
                            children: [
                              f.jsx('strong', { children: 'Price:' }),
                              ' ',
                              f.jsx('span', {
                                className: 'modal-price',
                                children: a.price,
                              }),
                            ],
                          }),
                        ],
                      }),
                      f.jsxs('div', {
                        className: 'modal-description-section',
                        children: [
                          f.jsx('h4', { children: 'Description' }),
                          f.jsx('p', {
                            className: 'modal-description',
                            children: a.description,
                          }),
                        ],
                      }),
                      a.pedigree_url &&
                        f.jsx('a', {
                          className: 'pedigree-button',
                          href: a.pedigree_url,
                          target: '_blank',
                          rel: 'noreferrer',
                          children: 'View Pedigree PDF',
                        }),
                      !a.sold &&
                        f.jsxs('div', {
                          className: 'interest-box',
                          children: [
                            f.jsxs('h4', {
                              children: ['Interested in ', a.name, '?'],
                            }),
                            f.jsx('p', {
                              children:
                                'Fill this out and the owner will receive your message in the admin dashboard.',
                            }),
                            f.jsxs('form', {
                              className: 'interest-form',
                              onSubmit: _,
                              children: [
                                f.jsx('input', {
                                  type: 'text',
                                  placeholder: 'Your Name',
                                  value: d.name,
                                  onChange: (E) =>
                                    p({ ...d, name: E.target.value }),
                                  required: !0,
                                }),
                                f.jsx('input', {
                                  type: 'email',
                                  placeholder: 'Your Email',
                                  value: d.email,
                                  onChange: (E) =>
                                    p({ ...d, email: E.target.value }),
                                  required: !0,
                                }),
                                f.jsx('input', {
                                  type: 'tel',
                                  placeholder: 'Your Phone Number',
                                  value: d.phone,
                                  onChange: (E) =>
                                    p({ ...d, phone: E.target.value }),
                                }),
                                f.jsx('textarea', {
                                  placeholder: `Hi, I am interested in ${a.name}.`,
                                  value: d.message,
                                  onChange: (E) =>
                                    p({ ...d, message: E.target.value }),
                                  required: !0,
                                }),
                                f.jsx('button', {
                                  type: 'submit',
                                  children: 'Send Puppy Interest',
                                }),
                              ],
                            }),
                          ],
                        }),
                      a.sold &&
                        f.jsxs('div', {
                          className: 'sold-message-box',
                          children: [
                            f.jsx('h4', {
                              children: 'This puppy has been sold',
                            }),
                            f.jsx('p', {
                              children:
                                'Contact us about upcoming litters or other available puppies.',
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
const Gl = [
  {
    title: 'Before Buying a Puppy',
    description:
      'Helpful information for families who are thinking about bringing home an XL American Bully.',
    questions: [
      {
        question: 'Is an XL American Bully a good family dog?',
        answer:
          'XL American Bullies are known for being loyal, confident, affectionate, and family-oriented when they are raised, socialized, and cared for properly. Like any breed, they need structure, attention, exercise, training, and responsible ownership.',
      },
      {
        question: 'What should I know before buying a puppy?',
        answer:
          'Before buying, you should be ready for the cost of food, vet care, training, supplies, time, and long-term commitment. Puppies need patience, consistency, and a stable home environment.',
      },
      {
        question: 'Are these dogs good for first-time owners?',
        answer:
          'They can be, but first-time owners should be prepared to learn about training, structure, boundaries, and proper socialization. A strong dog needs a responsible owner who is willing to be consistent.',
      },
    ],
  },
  {
    title: 'Reserve & Deposit Information',
    description:
      'Understand how reserving a puppy works and what to expect during the process.',
    questions: [
      {
        question: 'How do I reserve a puppy?',
        answer:
          'To reserve a puppy, contact us about the puppy you are interested in. The owner will explain availability, pricing, deposit details, and the next steps.',
      },
      {
        question: 'Are deposits refundable?',
        answer:
          'Deposit terms should always be confirmed directly with the owner before sending payment. In many breeding programs, deposits are used to hold a puppy and may not be refundable once the puppy is reserved.',
      },
      {
        question: 'Can I join a waitlist for an upcoming litter?',
        answer:
          'Yes. If puppies are not currently available, you can contact us about upcoming breedings and future litters. The owner can explain the waitlist process and expected availability.',
      },
    ],
  },
  {
    title: 'Bringing Your Puppy Home',
    description:
      'What to expect when your puppy is ready to leave and adjust to the new home.',
    questions: [
      {
        question: 'What should I buy before bringing my puppy home?',
        answer:
          'You should have puppy food, food and water bowls, a crate, collar, leash, toys, cleaning supplies, bedding, and a safe space prepared before pickup.',
      },
      {
        question: 'How should I introduce the puppy to my home?',
        answer:
          'Keep the first few days calm and simple. Let the puppy adjust slowly, avoid overwhelming them with too many people at once, and begin building a routine for feeding, potty breaks, crate time, and rest.',
      },
      {
        question: 'How long does it take a puppy to adjust?',
        answer:
          'Every puppy is different, but many puppies need a few days to a few weeks to fully settle in. A consistent routine helps them feel safe and confident.',
      },
    ],
  },
  {
    title: 'Food, Health & Vet Care',
    description:
      'Basic health and care information every buyer should understand.',
    questions: [
      {
        question: 'What should I feed my puppy?',
        answer:
          'Ask the owner what food the puppy is currently eating before switching. If you change food, transition slowly over several days to avoid stomach issues.',
      },
      {
        question: 'When should I take my puppy to the vet?',
        answer:
          'Schedule a vet visit shortly after bringing your puppy home. Your vet can review vaccine needs, health status, deworming, diet, and care recommendations.',
      },
      {
        question: 'Do puppies need vaccines?',
        answer:
          'Yes. Puppies need a vaccine schedule recommended by a licensed veterinarian. Your vet will tell you what shots are needed and when.',
      },
    ],
  },
  {
    title: 'Training & Socialization',
    description:
      'Good structure early helps your puppy grow into a confident adult dog.',
    questions: [
      {
        question: 'When should training start?',
        answer:
          'Training should start right away with simple basics like name recognition, crate routine, potty schedule, leash manners, and calm boundaries.',
      },
      {
        question: 'How important is socialization?',
        answer:
          'Socialization is very important. Puppies should be introduced to new people, sounds, environments, and safe experiences gradually and positively.',
      },
      {
        question: 'Should I crate train my puppy?',
        answer:
          'Crate training can be very helpful for potty training, safety, routine, and giving the puppy a calm place to rest. It should always be done patiently and positively.',
      },
    ],
  },
  {
    title: 'Stud Services & Breeding Questions',
    description:
      'Helpful information for people interested in stud services or future breedings.',
    questions: [
      {
        question: 'How do I ask about stud service?',
        answer:
          'Go to the Studs page, select the stud you are interested in, and submit an inquiry. The owner will follow up with availability, requirements, pricing, and next steps.',
      },
      {
        question: 'What information should I provide for stud service?',
        answer:
          'Provide information about your female dog, health status, pedigree if available, timing, location, and what you are looking for in the breeding.',
      },
      {
        question: 'Can I ask about upcoming breedings?',
        answer:
          'Yes. Upcoming breedings can be viewed on the Available Puppies page. You can contact the owner about waitlist availability and future litter plans.',
      },
    ],
  },
];
function HE() {
  const [a, n] = x.useState(0),
    [s, r] = x.useState('0-0'),
    o = (c, d) => {
      const p = `${c}-${d}`;
      r(s === p ? '' : p);
    };
  return f.jsxs('main', {
    className: 'puppy-info-page',
    children: [
      f.jsxs('section', {
        className: 'puppy-info-hero',
        children: [
          f.jsx('p', { className: 'eyebrow', children: 'Puppy Info' }),
          f.jsx('h1', { children: 'New Buyer Q&A Guide' }),
          f.jsx('p', {
            children:
              'Learn what to expect before buying, reserving, bringing home, and caring for your puppy.',
          }),
          f.jsxs('div', {
            className: 'puppy-info-hero-actions',
            children: [
              f.jsx(bt, {
                to: '/available-puppies',
                className: 'primary-button',
                children: 'View Available Puppies',
              }),
              f.jsx(bt, {
                to: '/contact',
                className: 'secondary-button',
                children: 'Ask a Question',
              }),
            ],
          }),
        ],
      }),
      f.jsxs('section', {
        className: 'puppy-info-shell',
        children: [
          f.jsxs('div', {
            className: 'puppy-info-sidebar',
            children: [
              f.jsx('p', { className: 'eyebrow', children: 'Topics' }),
              Gl.map((c, d) =>
                f.jsx(
                  'button',
                  {
                    className: a === d ? 'active' : '',
                    onClick: () => {
                      (n(d), r(`${d}-0`));
                    },
                    type: 'button',
                    children: c.title,
                  },
                  c.title,
                ),
              ),
            ],
          }),
          f.jsxs('div', {
            className: 'puppy-info-content',
            children: [
              f.jsxs('div', {
                className: 'puppy-info-topic-header',
                children: [
                  f.jsx('span', { children: String(a + 1).padStart(2, '0') }),
                  f.jsxs('div', {
                    children: [
                      f.jsx('h2', { children: Gl[a].title }),
                      f.jsx('p', { children: Gl[a].description }),
                    ],
                  }),
                ],
              }),
              f.jsx('div', {
                className: 'qa-list',
                children: Gl[a].questions.map((c, d) => {
                  const p = `${a}-${d}`,
                    m = s === p;
                  return f.jsxs(
                    'article',
                    {
                      className: `qa-card ${m ? 'open' : ''}`,
                      children: [
                        f.jsxs('button', {
                          type: 'button',
                          className: 'qa-question',
                          onClick: () => o(a, d),
                          children: [
                            f.jsx('span', { children: c.question }),
                            f.jsx('strong', { children: m ? '−' : '+' }),
                          ],
                        }),
                        m &&
                          f.jsx('p', {
                            className: 'qa-answer',
                            children: c.answer,
                          }),
                      ],
                    },
                    p,
                  );
                }),
              }),
            ],
          }),
        ],
      }),
      f.jsxs('section', {
        className: 'puppy-info-cta',
        children: [
          f.jsxs('div', {
            children: [
              f.jsx('p', {
                className: 'eyebrow',
                children: 'Still Have Questions?',
              }),
              f.jsx('h2', { children: 'Talk With Seibab Kennel' }),
              f.jsx('p', {
                children:
                  'If you are interested in a puppy, upcoming breeding, or stud service, send a message and the owner can help guide you.',
              }),
            ],
          }),
          f.jsx(bt, {
            to: '/contact',
            className: 'primary-button',
            children: 'Contact Us',
          }),
        ],
      }),
      f.jsx(Sd, {}),
    ],
  });
}
function $E() {
  const [a, n] = x.useState([]),
    [s, r] = x.useState(null),
    [o, c] = x.useState(''),
    [d, p] = x.useState({ name: '', email: '', phone: '', message: '' });
  x.useEffect(() => {
    m();
  }, []);
  const m = async () => {
      const { data: S, error: j } = await ye
        .from('Studs')
        .select('*')
        .order('featured', { ascending: !1 })
        .order('id', { ascending: !1 });
      j || n(S || []);
    },
    g = async (S) => {
      (r(S),
        c(S.image_url),
        await ye.from('Analytics').insert([
          {
            item_type: 'stud',
            item_id: S.id,
            item_name: S.name,
            action: 'view',
          },
        ]));
    },
    y = () => {
      (r(null), c(''), p({ name: '', email: '', phone: '', message: '' }));
    },
    _ = async (S) => {
      S.preventDefault();
      const j = `
STUD SERVICE INTEREST

Interested Stud: ${s.name}
Status: ${s.status}
Bloodline: ${s.bloodline}
Stud Fee: ${s.fee}

Customer Phone: ${d.phone || 'Not provided'}

Customer Message:
${d.message}
    `,
        { error: E } = await ye
          .from('Messages')
          .insert([
            { name: d.name, email: d.email, message: j, status: 'New' },
          ]);
      if (E) {
        alert('Interest message failed to send.');
        return;
      }
      (await ye.from('Analytics').insert([
        {
          item_type: 'stud',
          item_id: s.id,
          item_name: s.name,
          action: 'inquiry',
        },
      ]),
        alert('Your stud inquiry was sent successfully!'),
        y());
    };
  return f.jsxs('main', {
    className: 'studs-page',
    children: [
      f.jsxs('section', {
        className: 'studs-hero',
        children: [
          f.jsx('p', { className: 'eyebrow', children: 'Stud Services' }),
          f.jsx('h1', { children: 'Seibab Kennel Studs' }),
          f.jsx('p', {
            children:
              'View our available and upcoming XL American Bully studs.',
          }),
        ],
      }),
      f.jsx('section', {
        className: 'stud-info-banner',
        children: f.jsxs('div', {
          children: [
            f.jsx('h2', { children: 'Interested in a Stud Service?' }),
            f.jsx('p', {
              children:
                'Click a stud below to view details and send an inquiry.',
            }),
          ],
        }),
      }),
      a.length === 0
        ? f.jsxs('section', {
            className: 'no-studs-box',
            children: [
              f.jsx('h2', { children: 'No studs listed yet' }),
              f.jsx('p', {
                children:
                  'Check back soon or contact us for upcoming stud availability.',
              }),
            ],
          })
        : f.jsx('section', {
            className: 'studs-grid',
            children: a.map((S) =>
              f.jsxs(
                'button',
                {
                  className: 'stud-card',
                  onClick: () => g(S),
                  children: [
                    f.jsxs('div', {
                      className: 'stud-image-wrap',
                      children: [
                        f.jsx('img', { src: S.image_url, alt: S.name }),
                        f.jsx('span', { children: S.status }),
                        S.featured &&
                          f.jsx('div', {
                            className: 'featured-badge',
                            children: 'Featured',
                          }),
                      ],
                    }),
                    f.jsxs('div', {
                      className: 'stud-card-content',
                      children: [
                        f.jsx('h3', { children: S.name }),
                        f.jsx('p', {
                          className: 'stud-bloodline',
                          children: S.bloodline,
                        }),
                        f.jsx('p', {
                          className: 'stud-description',
                          children: S.description,
                        }),
                        f.jsx('p', { className: 'stud-fee', children: S.fee }),
                      ],
                    }),
                  ],
                },
                S.id,
              ),
            ),
          }),
      s &&
        f.jsx('div', {
          className: 'stud-modal-overlay',
          onClick: y,
          children: f.jsxs('div', {
            className: 'stud-modal',
            onClick: (S) => S.stopPropagation(),
            children: [
              f.jsx('button', {
                className: 'stud-modal-close',
                onClick: y,
                children: '×',
              }),
              f.jsxs('div', {
                className: 'stud-modal-grid',
                children: [
                  f.jsxs('div', {
                    className: 'stud-modal-images',
                    children: [
                      f.jsx('img', { src: o, alt: s.name }),
                      f.jsx('div', {
                        className: 'stud-thumb-row',
                        children: [s.image_url, ...(s.gallery_urls || [])].map(
                          (S) =>
                            f.jsx(
                              'button',
                              {
                                className: o === S ? 'active' : '',
                                onClick: () => c(S),
                                children: f.jsx('img', {
                                  src: S,
                                  alt: 'Stud thumbnail',
                                }),
                              },
                              S,
                            ),
                        ),
                      }),
                    ],
                  }),
                  f.jsxs('div', {
                    className: 'stud-modal-content',
                    children: [
                      f.jsx('p', { className: 'eyebrow', children: s.status }),
                      s.featured &&
                        f.jsx('span', {
                          className: 'featured-pill',
                          children: 'Featured Stud',
                        }),
                      f.jsx('h2', { children: s.name }),
                      f.jsxs('p', {
                        children: [
                          f.jsx('strong', { children: 'Bloodline:' }),
                          ' ',
                          s.bloodline,
                        ],
                      }),
                      f.jsxs('p', {
                        children: [
                          f.jsx('strong', { children: 'Stud Fee:' }),
                          ' ',
                          s.fee,
                        ],
                      }),
                      f.jsxs('div', {
                        className: 'stud-description-section',
                        children: [
                          f.jsx('h4', { children: 'Description' }),
                          f.jsx('p', { children: s.description }),
                        ],
                      }),
                      s.pedigree_url &&
                        f.jsx('a', {
                          className: 'pedigree-button',
                          href: s.pedigree_url,
                          target: '_blank',
                          rel: 'noreferrer',
                          children: 'View Pedigree PDF',
                        }),
                      f.jsxs('div', {
                        className: 'stud-interest-box',
                        children: [
                          f.jsxs('h3', {
                            children: ['Interested in ', s.name, '?'],
                          }),
                          f.jsx('p', {
                            children:
                              'Fill this out and the owner will receive your stud inquiry in the admin dashboard.',
                          }),
                          f.jsxs('form', {
                            className: 'stud-interest-form',
                            onSubmit: _,
                            children: [
                              f.jsx('input', {
                                type: 'text',
                                placeholder: 'Your Name',
                                value: d.name,
                                onChange: (S) =>
                                  p({ ...d, name: S.target.value }),
                                required: !0,
                              }),
                              f.jsx('input', {
                                type: 'email',
                                placeholder: 'Your Email',
                                value: d.email,
                                onChange: (S) =>
                                  p({ ...d, email: S.target.value }),
                                required: !0,
                              }),
                              f.jsx('input', {
                                type: 'tel',
                                placeholder: 'Your Phone Number',
                                value: d.phone,
                                onChange: (S) =>
                                  p({ ...d, phone: S.target.value }),
                              }),
                              f.jsx('textarea', {
                                placeholder: `Hi, I am interested in stud service with ${s.name}.`,
                                value: d.message,
                                onChange: (S) =>
                                  p({ ...d, message: S.target.value }),
                                required: !0,
                              }),
                              f.jsx('button', {
                                type: 'submit',
                                children: 'Send Stud Inquiry',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
function IE() {
  const [a, n] = x.useState(!1);
  return f.jsxs('main', {
    className: 'about-page',
    children: [
      f.jsxs('section', {
        className: 'about-card',
        children: [
          f.jsx('div', {
            className: 'about-logo-container',
            children: f.jsx('img', {
              src: Dg,
              alt: 'Seibab Kennel Logo',
              className: 'about-logo',
            }),
          }),
          f.jsxs('div', {
            className: 'about-content',
            children: [
              f.jsx('p', { className: 'eyebrow', children: 'About Us' }),
              f.jsx('h1', { children: 'About Seibab Kennel' }),
              f.jsx('p', {
                children:
                  'Seibab Kennel Inc. is dedicated to breeding top-quality Extreme / XL American Bullies with strong structure, clean presentation, and family-friendly temperaments.',
              }),
              f.jsx('p', {
                children:
                  'Our goal is to raise confident, loyal companions that are healthy, well-socialized, and ready to become part of loving homes.',
              }),
              f.jsx('p', {
                children:
                  'Located in Dallas, TX, we take pride in our breeding standards, communication, and long-term support for every puppy we place.',
              }),
            ],
          }),
        ],
      }),
      f.jsxs('section', {
        className: 'standards-section',
        children: [
          f.jsxs('div', {
            className: 'standards-heading',
            children: [
              f.jsx('p', {
                className: 'eyebrow',
                children: 'Standards & Care',
              }),
              f.jsx('h2', {
                children: 'Built Around Trust, Health, and Quality',
              }),
              f.jsx('p', {
                children:
                  'Our program is focused on responsible ownership, strong structure, stable temperaments, and clear communication with every family.',
              }),
            ],
          }),
          f.jsxs('div', {
            className: 'standards-grid',
            children: [
              f.jsxs('article', {
                className: 'standard-card ABKC-card',
                children: [
                  f.jsx('div', {
                    className: 'standard-icon-box',
                    children: a
                      ? f.jsx('span', { children: 'ABKC' })
                      : f.jsx('img', {
                          src: '/ABKC-logo.png',
                          alt: 'ABKC Logo',
                          className: 'ABKC-logo',
                          onError: () => n(!0),
                        }),
                  }),
                  f.jsxs('div', {
                    children: [
                      f.jsx('h3', { children: 'ABKC Registered' }),
                      f.jsx('p', {
                        children:
                          'Seibab Kennel dogs are registered with the ABKC. We focus on producing XL American Bullies with quality structure, presence, and family-ready temperaments.',
                      }),
                    ],
                  }),
                ],
              }),
              f.jsxs('article', {
                className: 'standard-card',
                children: [
                  f.jsx('div', {
                    className: 'standard-icon-box',
                    children: f.jsx('span', { children: '✓' }),
                  }),
                  f.jsxs('div', {
                    children: [
                      f.jsx('h3', { children: 'Health Tested' }),
                      f.jsx('p', {
                        children:
                          'We care about long-term health and responsible pairings. Our dogs are health tested where applicable, and we encourage every buyer to continue regular vet care after bringing their puppy home.',
                      }),
                    ],
                  }),
                ],
              }),
              f.jsxs('article', {
                className: 'standard-card',
                children: [
                  f.jsx('div', {
                    className: 'standard-icon-box',
                    children: f.jsx('span', { children: 'DNA' }),
                  }),
                  f.jsxs('div', {
                    children: [
                      f.jsx('h3', { children: 'Embark Tested' }),
                      f.jsx('p', {
                        children:
                          'Embark testing is used where applicable to support better breeding decisions, genetic awareness, and transparency for families interested in our dogs.',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const GE = 'https://www.instagram.com/seibab_kennels/',
  KE = () => {
    const a = x.useRef(),
      n = async (s) => {
        s.preventDefault();
        const r = s.target.user_name.value,
          o = s.target.user_email.value,
          c = s.target.message.value,
          { error: d } = await ye
            .from('Messages')
            .insert([{ name: r, email: o, message: c, status: 'New' }]);
        if (d) {
          alert('Message failed to send.');
          return;
        }
        (alert('Message sent successfully!'), s.target.reset());
      };
    return f.jsxs('main', {
      className: 'contact-page',
      children: [
        f.jsxs('section', {
          className: 'contact-hero',
          children: [
            f.jsx('p', { className: 'eyebrow', children: 'Contact Us' }),
            f.jsx('h1', { children: 'Let’s Talk Puppies' }),
            f.jsx('p', {
              children:
                'Have questions about available puppies, studs, upcoming litters, pricing, or the process? Send us a message and we’ll get back to you.',
            }),
          ],
        }),
        f.jsxs('section', {
          className: 'contact-layout',
          children: [
            f.jsxs('div', {
              className: 'contact-info-card',
              children: [
                f.jsx('h2', { children: 'Seibab Kennel' }),
                f.jsx('p', { children: 'Extreme / XL American Bullies' }),
                f.jsxs('div', {
                  className: 'contact-info-list',
                  children: [
                    f.jsxs('p', {
                      children: [
                        f.jsx('strong', { children: 'Location:' }),
                        ' Dallas, TX',
                      ],
                    }),
                    f.jsxs('p', {
                      children: [
                        f.jsx('strong', { children: 'Phone:' }),
                        ' (972) 330-3392',
                      ],
                    }),
                    f.jsxs('p', {
                      children: [
                        f.jsx('strong', { children: 'Email:' }),
                        ' seibabkennels@gmail.com',
                      ],
                    }),
                  ],
                }),
                f.jsxs('div', {
                  className: 'social-card',
                  children: [
                    f.jsxs('div', {
                      children: [
                        f.jsx('span', {
                          className: 'social-kicker',
                          children: 'Follow Seibab Kennel',
                        }),
                        f.jsx('h3', { children: 'See Updates on Instagram' }),
                        f.jsx('p', {
                          children:
                            'Follow for new puppies, studs, upcoming breedings, and behind-the-scenes kennel content.',
                        }),
                      ],
                    }),
                    f.jsxs('a', {
                      href: GE,
                      target: '_blank',
                      rel: 'noreferrer',
                      className: 'instagram-button',
                      children: [
                        f.jsx('span', { children: 'Instagram' }),
                        f.jsx('strong', { children: '@seibab_kennels' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            f.jsxs('form', {
              className: 'contact-form',
              ref: a,
              onSubmit: n,
              children: [
                f.jsxs('label', {
                  children: [
                    'Name',
                    f.jsx('input', {
                      type: 'text',
                      name: 'user_name',
                      placeholder: 'Your Name',
                      required: !0,
                    }),
                  ],
                }),
                f.jsxs('label', {
                  children: [
                    'Email',
                    f.jsx('input', {
                      type: 'email',
                      name: 'user_email',
                      placeholder: 'you@example.com',
                      required: !0,
                    }),
                  ],
                }),
                f.jsxs('label', {
                  children: [
                    'Message',
                    f.jsx('textarea', {
                      name: 'message',
                      rows: '6',
                      placeholder:
                        'Tell us what puppy, stud, or information you are interested in...',
                      required: !0,
                    }),
                  ],
                }),
                f.jsx('button', { type: 'submit', children: 'Send Message' }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  JE = () => {
    const [a, n] = x.useState(!0),
      [s, r] = x.useState(''),
      [o, c] = x.useState('messages'),
      [d, p] = x.useState([]),
      [m, g] = x.useState([]),
      [y, _] = x.useState([]),
      [S, j] = x.useState([]),
      [E, O] = x.useState([]),
      [M, z] = x.useState([]),
      [q, P] = x.useState([]),
      [I, J] = x.useState({
        name: '',
        gender: '',
        price: '',
        status: 'Available',
        description: '',
        imageFile: null,
        galleryFiles: [],
        pedigreeFile: null,
        featured: !1,
        sold: !1,
      }),
      [Y, W] = x.useState({
        name: '',
        fee: '',
        status: 'Available',
        bloodline: '',
        description: '',
        imageFile: null,
        galleryFiles: [],
        pedigreeFile: null,
        featured: !1,
      }),
      [ee, se] = x.useState({
        title: '',
        tag: 'Announcement',
        description: '',
        imageFile: null,
        buttonText: 'Learn More',
        redirectPath: '/whats-new',
        active: !0,
        featured: !1,
      }),
      [oe, ve] = x.useState({
        title: '',
        imageFile: null,
        sire: '',
        sireImageFile: null,
        dam: '',
        damImageFile: null,
        expectedDate: '',
        status: 'Upcoming',
        description: '',
        active: !0,
        featured: !1,
      });
    x.useEffect(() => {
      (n(!0), Te(), fe(), Ae(), ue(), B(), X(), te());
    }, []);
    const Te = async () => {
        const { data: w, error: C } = await ye
          .from('Messages')
          .select('*')
          .order('created_at', { ascending: !1 });
        C || p(w || []);
      },
      fe = async () => {
        const { data: w, error: C } = await ye
          .from('Puppies')
          .select('*')
          .order('id', { ascending: !1 });
        C || g(w || []);
      },
      Ae = async () => {
        const { data: w, error: C } = await ye
          .from('Studs')
          .select('*')
          .order('id', { ascending: !1 });
        C || _(w || []);
      },
      ue = async () => {
        const { data: w, error: C } = await ye
          .from('Reviews')
          .select('*')
          .order('created_at', { ascending: !1 });
        C || j(w || []);
      },
      B = async () => {
        const { data: w, error: C } = await ye
          .from('WhatsNew')
          .select('*')
          .order('created_at', { ascending: !1 });
        C || O(w || []);
      },
      X = async () => {
        const { data: w, error: C } = await ye
          .from('UpcomingBreedings')
          .select('*')
          .order('featured', { ascending: !1 })
          .order('created_at', { ascending: !1 });
        C || z(w || []);
      },
      te = async () => {
        const { data: w, error: C } = await ye
          .from('DepositRequests')
          .select('*')
          .order('created_at', { ascending: !1 });
        C || P(w || []);
      },
      ce = async (w, C) => {
        if (!w) return null;
        const ne = w.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, ''),
          Oe = `${C}/${Date.now()}-${ne}`,
          { data: Qe, error: Xt } = await ye.storage
            .from('kennel-images')
            .upload(Oe, w, {
              cacheControl: '3600',
              upsert: !1,
              contentType: w.type,
            });
        if (Xt) return (alert(`Upload failed: ${Xt.message}`), null);
        const { data: go } = ye.storage
          .from('kennel-images')
          .getPublicUrl(Qe.path);
        return go.publicUrl;
      },
      A = async (w, C) => {
        const ne = [];
        for (const Oe of w) {
          const Qe = await ce(Oe, C);
          Qe && ne.push(Qe);
        }
        return ne;
      },
      G = (w) => {
        w.preventDefault();
      },
      V = () => {
        fetch('/api/auth', { method: 'DELETE' }).then(() => {
          window.location.href = '/admin';
        });
      },
      Q = async (w, C) => {
        (await ye.from('Messages').update({ status: C }).eq('id', w), Te());
      },
      le = async (w) => {
        window.confirm('Delete this message?') &&
          (await ye.from('Messages').delete().eq('id', w), Te());
      },
      _e = async (w, C) => {
        const { error: ne } = await ye
          .from('Reviews')
          .update({ approved: C })
          .eq('id', w);
        if (ne) {
          alert(`Review update failed: ${ne.message}`);
          return;
        }
        ue();
      },
      de = async (w) => {
        if (!window.confirm('Delete this review?')) return;
        const { error: C } = await ye.from('Reviews').delete().eq('id', w);
        if (C) {
          alert(`Review delete failed: ${C.message}`);
          return;
        }
        ue();
      },
      Ke = async (w) => {
        w.preventDefault();
        const C = await ce(ee.imageFile, 'whats-new'),
          { error: ne } = await ye.from('WhatsNew').insert([
            {
              title: ee.title,
              tag: ee.tag,
              description: ee.description,
              image_url: C,
              button_text: ee.buttonText,
              redirect_path: ee.redirectPath,
              active: ee.active,
              featured: ee.featured,
            },
          ]);
        if (ne) {
          alert(`Failed to add update: ${ne.message}`);
          return;
        }
        (alert("What's New update added successfully!"),
          se({
            title: '',
            tag: 'Announcement',
            description: '',
            imageFile: null,
            buttonText: 'Learn More',
            redirectPath: '/whats-new',
            active: !0,
            featured: !1,
          }),
          B());
      },
      xe = (w, C, ne) => saveField('WhatsNew', w, C, ne, O),
      zt = async (w, C) => {
        const ne = await ce(C, 'whats-new');
        ne && (await xe(w, 'image_url', ne));
      },
      jn = async (w) => {
        if (!window.confirm('Delete this update?')) return;
        const { error: C } = await ye.from('WhatsNew').delete().eq('id', w);
        if (C) {
          alert(`Delete failed: ${C.message}`);
          return;
        }
        B();
      },
      Jn = async (w) => {
        w.preventDefault();
        const C = await ce(oe.imageFile, 'upcoming-breedings/main'),
          ne = await ce(oe.sireImageFile, 'upcoming-breedings/sire'),
          Oe = await ce(oe.damImageFile, 'upcoming-breedings/dam'),
          { error: Qe } = await ye.from('UpcomingBreedings').insert([
            {
              title: oe.title,
              image_url: C,
              sire: oe.sire,
              sire_image_url: ne,
              dam: oe.dam,
              dam_image_url: Oe,
              expected_date: oe.expectedDate,
              status: oe.status,
              description: oe.description,
              active: oe.active,
              featured: oe.featured,
            },
          ]);
        if (Qe) {
          alert(`Failed to add upcoming breeding: ${Qe.message}`);
          return;
        }
        (alert('Upcoming breeding added successfully!'),
          ve({
            title: '',
            imageFile: null,
            sire: '',
            sireImageFile: null,
            dam: '',
            damImageFile: null,
            expectedDate: '',
            status: 'Upcoming',
            description: '',
            active: !0,
            featured: !1,
          }),
          X(),
          te());
      },
      ut = (w, C, ne) => saveField('UpcomingBreedings', w, C, ne, z),
      Aa = async (w, C) => {
        const ne = await ce(C, 'upcoming-breedings/main');
        ne && (await ut(w, 'image_url', ne));
      },
      Ra = async (w, C) => {
        const ne = await ce(C, 'upcoming-breedings/sire');
        ne && (await ut(w, 'sire_image_url', ne));
      },
      Tn = async (w, C) => {
        const ne = await ce(C, 'upcoming-breedings/dam');
        ne && (await ut(w, 'dam_image_url', ne));
      },
      ni = async (w) => {
        if (!window.confirm('Delete this upcoming breeding?')) return;
        const { error: C } = await ye
          .from('UpcomingBreedings')
          .delete()
          .eq('id', w);
        if (C) {
          alert(`Delete failed: ${C.message}`);
          return;
        }
        (X(), te());
      },
      Rt = async (w) => {
        w.preventDefault();
        const C = await ce(I.imageFile, 'puppies/main');
        if (!C) {
          alert('Please upload a main puppy image.');
          return;
        }
        const ne = await A(I.galleryFiles, 'puppies/gallery'),
          Oe = await ce(I.pedigreeFile, 'puppies/pedigrees'),
          { error: Qe } = await ye.from('Puppies').insert([
            {
              name: I.name,
              image_url: C,
              gender: I.gender,
              price: I.price,
              status: I.status,
              description: I.description,
              gallery_urls: ne,
              pedigree_url: Oe,
              featured: I.featured,
              sold: I.sold,
            },
          ]);
        if (Qe) {
          alert(`Failed to add puppy: ${Qe.message}`);
          return;
        }
        (alert('Puppy added successfully!'),
          J({
            name: '',
            gender: '',
            price: '',
            status: 'Available',
            description: '',
            imageFile: null,
            galleryFiles: [],
            pedigreeFile: null,
            featured: !1,
            sold: !1,
          }),
          fe());
      },
      _t = (w, C, ne) => saveField('Puppies', w, C, ne, g),
      Oa = async (w, C) => {
        const ne = await ce(C, 'puppies/main');
        ne && (await _t(w, 'image_url', ne));
      },
      ai = async (w) => {
        const C = document.createElement('input');
        ((C.type = 'file'),
          (C.accept = 'image/*'),
          (C.multiple = !0),
          (C.onchange = async (ne) => {
            const Oe = Array.from(ne.target.files),
              Qe = await A(Oe, 'puppies/gallery'),
              Xt = w.gallery_urls || [];
            await _t(w.id, 'gallery_urls', [...Xt, ...Qe]);
          }),
          C.click());
      },
      F = async (w, C) => {
        const ne = (w.gallery_urls || []).filter((Oe) => Oe !== C);
        await _t(w.id, 'gallery_urls', ne);
      },
      Le = async (w, C) => {
        const ne = await ce(C, 'puppies/pedigrees');
        ne && (await _t(w, 'pedigree_url', ne));
      },
      et = async (w) => {
        window.confirm('Delete this puppy?') &&
          (await ye.from('Puppies').delete().eq('id', w), fe());
      },
      Ot = async (w) => {
        w.preventDefault();
        const C = await ce(Y.imageFile, 'studs/main');
        if (!C) {
          alert('Please upload a main stud image.');
          return;
        }
        const ne = await A(Y.galleryFiles, 'studs/gallery'),
          Oe = await ce(Y.pedigreeFile, 'studs/pedigrees'),
          { error: Qe } = await ye.from('Studs').insert([
            {
              name: Y.name,
              image_url: C,
              fee: Y.fee,
              status: Y.status,
              bloodline: Y.bloodline,
              description: Y.description,
              gallery_urls: ne,
              pedigree_url: Oe,
              featured: Y.featured,
            },
          ]);
        if (Qe) {
          alert(`Failed to add stud: ${Qe.message}`);
          return;
        }
        (alert('Stud added successfully!'),
          W({
            name: '',
            fee: '',
            status: 'Available',
            bloodline: '',
            description: '',
            imageFile: null,
            galleryFiles: [],
            pedigreeFile: null,
            featured: !1,
          }),
          Ae());
      },
      $e = (w, C, ne) => saveField('Studs', w, C, ne, _),
      Pt = async (w, C) => {
        const ne = await ce(C, 'studs/main');
        ne && (await $e(w, 'image_url', ne));
      },
      tt = async (w) => {
        const C = document.createElement('input');
        ((C.type = 'file'),
          (C.accept = 'image/*'),
          (C.multiple = !0),
          (C.onchange = async (ne) => {
            const Oe = Array.from(ne.target.files),
              Qe = await A(Oe, 'studs/gallery'),
              Xt = w.gallery_urls || [];
            await $e(w.id, 'gallery_urls', [...Xt, ...Qe]);
          }),
          C.click());
      },
      Tt = async (w, C) => {
        const ne = (w.gallery_urls || []).filter((Oe) => Oe !== C);
        await $e(w.id, 'gallery_urls', ne);
      },
      rt = async (w, C) => {
        const ne = await ce(C, 'studs/pedigrees');
        ne && (await $e(w, 'pedigree_url', ne));
      },
      Nt = async (w) => {
        window.confirm('Delete this stud?') &&
          (await ye.from('Studs').delete().eq('id', w), Ae());
      },
      rn = async (w, C) => {
        const { error: ne } = await ye
          .from('DepositRequests')
          .update({ status: C })
          .eq('id', w);
        if (ne) {
          alert(`Deposit status update failed: ${ne.message}`);
          return;
        }
        te();
      },
      An = async (w) => {
        if (!window.confirm('Delete this deposit request?')) return;
        const { error: C } = await ye
          .from('DepositRequests')
          .delete()
          .eq('id', w);
        if (C) {
          alert(`Deposit request delete failed: ${C.message}`);
          return;
        }
        te();
      },
      ln = (w, C, ne) =>
        `mailto:${w}?subject=${encodeURIComponent(C)}&body=${encodeURIComponent(ne)}`,
      mn = (w, C) => `Hi ${w},

Thank you for reaching out to Seibab Kennel.

I received your inquiry and wanted to follow up with you. Before moving forward, I would like to learn a little more about your home, experience with dogs, and what you are looking for so we can make sure this is the right fit.

I will send over a few questions shortly. In the meantime, feel free to reply with anything else you would like me to know.

Original inquiry:
${C || 'No message provided'}

Thank you,
Seibab Kennel`,
      Rn = (w) => `Hi ${w.name},

Thank you for submitting a deposit request with Seibab Kennel.

I received your request and wanted to follow up before moving forward with deposit/payment details.

Deposit request details:
Interested in: ${w.interested_in || 'Not provided'}
Interest type: ${w.interest_type || 'Not provided'}
Deposit type: ${w.deposit_type || 'Not provided'}
Phone: ${w.phone || 'Not provided'}

Before we move forward, I may ask a few buyer questions to make sure this is a good fit and to confirm the next steps.

Thank you,
Seibab Kennel`,
      ii = (w) => `Hi ${w.name},

Thank you for taking the time to leave a review for Seibab Kennel. I appreciate your feedback and support.

Thank you,
Seibab Kennel`;
    return a
      ? f.jsxs('main', {
          className: 'admin-page',
          children: [
            f.jsxs('section', {
              className: 'admin-header',
              children: [
                f.jsxs('div', {
                  children: [
                    f.jsx('p', {
                      className: 'eyebrow',
                      children: 'Owner Dashboard',
                    }),
                    f.jsx('h1', { children: 'Admin Dashboard' }),
                    f.jsx('p', {
                      children: 'Update the website without touching code.',
                    }),
                  ],
                }),
                f.jsx('button', {
                  className: 'admin-logout',
                  onClick: V,
                  children: 'Log Out',
                }),
              ],
            }),
            f.jsxs('section', {
              className: 'admin-stats',
              children: [
                f.jsxs('div', {
                  children: [
                    f.jsx('h3', { children: 'Messages' }),
                    f.jsx('p', { children: d.length }),
                  ],
                }),
                f.jsxs('div', {
                  children: [
                    f.jsx('h3', { children: 'Puppies' }),
                    f.jsx('p', { children: m.length }),
                  ],
                }),
                f.jsxs('div', {
                  children: [
                    f.jsx('h3', { children: 'Studs' }),
                    f.jsx('p', { children: y.length }),
                  ],
                }),
                f.jsxs('div', {
                  children: [
                    f.jsx('h3', { children: 'Reviews' }),
                    f.jsx('p', { children: S.length }),
                  ],
                }),
                f.jsxs('div', {
                  children: [
                    f.jsx('h3', { children: 'Updates' }),
                    f.jsx('p', { children: E.length }),
                  ],
                }),
                f.jsxs('div', {
                  children: [
                    f.jsx('h3', { children: 'Breedings' }),
                    f.jsx('p', { children: M.length }),
                  ],
                }),
                f.jsxs('div', {
                  children: [
                    f.jsx('h3', { children: 'Deposits' }),
                    f.jsx('p', { children: q.length }),
                  ],
                }),
              ],
            }),
            f.jsxs('nav', {
              className: 'admin-tabs',
              children: [
                f.jsx('button', {
                  className: o === 'content' ? 'active' : '',
                  onClick: () => c('content'),
                  children: 'Website Text & Photos',
                }),
                f.jsx('button', {
                  className: o === 'messages' ? 'active' : '',
                  onClick: () => c('messages'),
                  children: 'Messages',
                }),
                f.jsx('button', {
                  className: o === 'updates' ? 'active' : '',
                  onClick: () => c('updates'),
                  children: "What's New",
                }),
                f.jsx('button', {
                  className: o === 'breedings' ? 'active' : '',
                  onClick: () => c('breedings'),
                  children: 'Upcoming Breedings',
                }),
                f.jsx('button', {
                  className: o === 'deposits' ? 'active' : '',
                  onClick: () => c('deposits'),
                  children: 'Deposit Requests',
                }),
                f.jsx('button', {
                  className: o === 'puppies' ? 'active' : '',
                  onClick: () => c('puppies'),
                  children: 'Puppies',
                }),
                f.jsx('button', {
                  className: o === 'studs' ? 'active' : '',
                  onClick: () => c('studs'),
                  children: 'Studs',
                }),
                f.jsx('button', {
                  className: o === 'reviews' ? 'active' : '',
                  onClick: () => c('reviews'),
                  children: 'Reviews',
                }),
              ],
            }),
            o === 'content' && f.jsx(ContentEditor, {}),
            o === 'messages' &&
              f.jsxs('section', {
                className: 'admin-panel',
                children: [
                  f.jsx('h2', { children: 'Customer Messages & Issues' }),
                  d.length === 0
                    ? f.jsxs('div', {
                        className: 'empty-box',
                        children: [
                          f.jsx('h3', { children: 'No messages yet' }),
                          f.jsx('p', {
                            children: 'Customer messages will appear here.',
                          }),
                        ],
                      })
                    : d.map((w) =>
                        f.jsxs(
                          'article',
                          {
                            className: 'admin-card',
                            children: [
                              f.jsxs('div', {
                                className: 'card-top',
                                children: [
                                  f.jsxs('div', {
                                    children: [
                                      f.jsx('h3', { children: w.name }),
                                      f.jsx('p', { children: w.email }),
                                      f.jsx('small', {
                                        children: new Date(
                                          w.created_at,
                                        ).toLocaleString(),
                                      }),
                                    ],
                                  }),
                                  f.jsx('span', {
                                    className: 'status-pill',
                                    children: w.status,
                                  }),
                                ],
                              }),
                              f.jsx('div', {
                                className: 'message-box',
                                children: w.message,
                              }),
                              f.jsxs('div', {
                                className: 'action-row',
                                children: [
                                  f.jsx('a', {
                                    className: 'email-customer-button',
                                    href: ln(
                                      w.email,
                                      'Seibab Kennel Inquiry Follow-Up',
                                      mn(w.name, w.message),
                                    ),
                                    children: 'Email Customer',
                                  }),
                                  f.jsx('button', {
                                    onClick: () => Q(w.id, 'New'),
                                    children: 'Mark New',
                                  }),
                                  f.jsx('button', {
                                    onClick: () => Q(w.id, 'In Progress'),
                                    children: 'In Progress',
                                  }),
                                  f.jsx('button', {
                                    onClick: () => Q(w.id, 'Resolved'),
                                    children: 'Mark Resolved',
                                  }),
                                  f.jsx('button', {
                                    className: 'danger',
                                    onClick: () => le(w.id),
                                    children: 'Delete',
                                  }),
                                ],
                              }),
                            ],
                          },
                          w.id,
                        ),
                      ),
                ],
              }),
            o === 'updates' &&
              f.jsxs('section', {
                className: 'admin-panel',
                children: [
                  f.jsx('h2', { children: "Manage What's New" }),
                  f.jsxs('form', {
                    className: 'admin-form',
                    onSubmit: Ke,
                    children: [
                      f.jsx('input', {
                        placeholder: 'Update title',
                        value: ee.title,
                        onChange: (w) => se({ ...ee, title: w.target.value }),
                        required: !0,
                      }),
                      f.jsxs('select', {
                        value: ee.tag,
                        onChange: (w) => se({ ...ee, tag: w.target.value }),
                        children: [
                          f.jsx('option', { children: 'Announcement' }),
                          f.jsx('option', { children: 'New Puppy' }),
                          f.jsx('option', { children: 'New Stud' }),
                          f.jsx('option', { children: 'Breed News' }),
                          f.jsx('option', { children: 'Upcoming Litter' }),
                          f.jsx('option', { children: 'Event' }),
                          f.jsx('option', { children: 'Important Update' }),
                        ],
                      }),
                      f.jsx('textarea', {
                        placeholder: 'Description',
                        value: ee.description,
                        onChange: (w) =>
                          se({ ...ee, description: w.target.value }),
                        required: !0,
                      }),
                      f.jsx('label', {
                        className: 'admin-file-label',
                        children: 'Optional Update Image',
                      }),
                      f.jsx('input', {
                        type: 'file',
                        accept: 'image/*',
                        onChange: (w) =>
                          se({ ...ee, imageFile: w.target.files[0] }),
                      }),
                      f.jsx('input', {
                        placeholder: 'Button text',
                        value: ee.buttonText,
                        onChange: (w) =>
                          se({ ...ee, buttonText: w.target.value }),
                      }),
                      f.jsxs('select', {
                        value: ee.redirectPath,
                        onChange: (w) =>
                          se({ ...ee, redirectPath: w.target.value }),
                        children: [
                          f.jsx('option', {
                            value: '/whats-new',
                            children: "What's New Page",
                          }),
                          f.jsx('option', {
                            value: '/available-puppies',
                            children: 'Available Puppies',
                          }),
                          f.jsx('option', {
                            value: '/studs',
                            children: 'Studs',
                          }),
                          f.jsx('option', {
                            value: '/contact',
                            children: 'Contact',
                          }),
                          f.jsx('option', {
                            value: '/about',
                            children: 'About',
                          }),
                        ],
                      }),
                      f.jsxs('div', {
                        className: 'admin-check-row',
                        children: [
                          f.jsxs('label', {
                            children: [
                              f.jsx('input', {
                                type: 'checkbox',
                                checked: ee.active,
                                onChange: (w) =>
                                  se({ ...ee, active: w.target.checked }),
                              }),
                              'Active',
                            ],
                          }),
                          f.jsxs('label', {
                            children: [
                              f.jsx('input', {
                                type: 'checkbox',
                                checked: ee.featured,
                                onChange: (w) =>
                                  se({ ...ee, featured: w.target.checked }),
                              }),
                              'Featured',
                            ],
                          }),
                        ],
                      }),
                      f.jsx('button', {
                        type: 'submit',
                        children: 'Add Update',
                      }),
                    ],
                  }),
                  E.length === 0
                    ? f.jsxs('div', {
                        className: 'empty-box',
                        children: [
                          f.jsx('h3', { children: 'No updates yet' }),
                          f.jsx('p', {
                            children: "What's New posts will appear here.",
                          }),
                        ],
                      })
                    : E.map((w) =>
                        f.jsxs(
                          'article',
                          {
                            className: 'admin-card edit-card',
                            children: [
                              w.image_url &&
                                f.jsx('img', {
                                  className: 'admin-preview-img',
                                  src: w.image_url,
                                  alt: w.title,
                                }),
                              f.jsx('label', {
                                className: 'admin-file-label',
                                children: 'Change Image',
                              }),
                              f.jsx('input', {
                                type: 'file',
                                accept: 'image/*',
                                onChange: (C) => zt(w.id, C.target.files[0]),
                              }),
                              f.jsx('input', {
                                value: w.title || '',
                                onChange: (C) =>
                                  xe(w.id, 'title', C.target.value),
                              }),
                              f.jsxs('select', {
                                value: w.tag || 'Announcement',
                                onChange: (C) =>
                                  xe(w.id, 'tag', C.target.value),
                                children: [
                                  f.jsx('option', { children: 'Announcement' }),
                                  f.jsx('option', { children: 'New Puppy' }),
                                  f.jsx('option', { children: 'New Stud' }),
                                  f.jsx('option', { children: 'Breed News' }),
                                  f.jsx('option', {
                                    children: 'Upcoming Litter',
                                  }),
                                  f.jsx('option', { children: 'Event' }),
                                  f.jsx('option', {
                                    children: 'Important Update',
                                  }),
                                ],
                              }),
                              f.jsx('textarea', {
                                value: w.description || '',
                                onChange: (C) =>
                                  xe(w.id, 'description', C.target.value),
                              }),
                              f.jsx('input', {
                                value: w.button_text || '',
                                onChange: (C) =>
                                  xe(w.id, 'button_text', C.target.value),
                              }),
                              f.jsxs('select', {
                                value: w.redirect_path || '/whats-new',
                                onChange: (C) =>
                                  xe(w.id, 'redirect_path', C.target.value),
                                children: [
                                  f.jsx('option', {
                                    value: '/whats-new',
                                    children: "What's New Page",
                                  }),
                                  f.jsx('option', {
                                    value: '/available-puppies',
                                    children: 'Available Puppies',
                                  }),
                                  f.jsx('option', {
                                    value: '/studs',
                                    children: 'Studs',
                                  }),
                                  f.jsx('option', {
                                    value: '/contact',
                                    children: 'Contact',
                                  }),
                                  f.jsx('option', {
                                    value: '/about',
                                    children: 'About',
                                  }),
                                ],
                              }),
                              f.jsxs('div', {
                                className: 'admin-check-row',
                                children: [
                                  f.jsxs('label', {
                                    children: [
                                      f.jsx('input', {
                                        type: 'checkbox',
                                        checked: !!w.active,
                                        onChange: (C) =>
                                          xe(w.id, 'active', C.target.checked),
                                      }),
                                      'Active',
                                    ],
                                  }),
                                  f.jsxs('label', {
                                    children: [
                                      f.jsx('input', {
                                        type: 'checkbox',
                                        checked: !!w.featured,
                                        onChange: (C) =>
                                          xe(
                                            w.id,
                                            'featured',
                                            C.target.checked,
                                          ),
                                      }),
                                      'Featured',
                                    ],
                                  }),
                                ],
                              }),
                              f.jsx('button', {
                                className: 'danger',
                                onClick: () => jn(w.id),
                                children: 'Delete Update',
                              }),
                            ],
                          },
                          w.id,
                        ),
                      ),
                ],
              }),
            o === 'breedings' &&
              f.jsxs('section', {
                className: 'admin-panel',
                children: [
                  f.jsx('h2', { children: 'Manage Upcoming Breedings' }),
                  f.jsxs('form', {
                    className: 'admin-form',
                    onSubmit: Jn,
                    children: [
                      f.jsx('input', {
                        placeholder:
                          'Breeding title, example: King x Luna Summer Litter',
                        value: oe.title,
                        onChange: (w) => ve({ ...oe, title: w.target.value }),
                        required: !0,
                      }),
                      f.jsx('label', {
                        className: 'admin-file-label',
                        children: 'Optional Breeding Image',
                      }),
                      f.jsx('input', {
                        type: 'file',
                        accept: 'image/*',
                        onChange: (w) =>
                          ve({ ...oe, imageFile: w.target.files[0] }),
                      }),
                      f.jsx('input', {
                        placeholder: 'Sire / Male',
                        value: oe.sire,
                        onChange: (w) => ve({ ...oe, sire: w.target.value }),
                      }),
                      f.jsx('label', {
                        className: 'admin-file-label',
                        children: 'Sire / Male Picture',
                      }),
                      f.jsx('input', {
                        type: 'file',
                        accept: 'image/*',
                        onChange: (w) =>
                          ve({ ...oe, sireImageFile: w.target.files[0] }),
                      }),
                      f.jsx('input', {
                        placeholder: 'Dam / Female',
                        value: oe.dam,
                        onChange: (w) => ve({ ...oe, dam: w.target.value }),
                      }),
                      f.jsx('label', {
                        className: 'admin-file-label',
                        children: 'Dam / Female Picture',
                      }),
                      f.jsx('input', {
                        type: 'file',
                        accept: 'image/*',
                        onChange: (w) =>
                          ve({ ...oe, damImageFile: w.target.files[0] }),
                      }),
                      f.jsx('input', {
                        placeholder:
                          'Expected date, example: Summer 2026 or July 2026',
                        value: oe.expectedDate,
                        onChange: (w) =>
                          ve({ ...oe, expectedDate: w.target.value }),
                      }),
                      f.jsxs('select', {
                        value: oe.status,
                        onChange: (w) => ve({ ...oe, status: w.target.value }),
                        children: [
                          f.jsx('option', { children: 'Upcoming' }),
                          f.jsx('option', { children: 'Confirmed' }),
                          f.jsx('option', { children: 'Pregnancy Confirmed' }),
                          f.jsx('option', { children: 'Born' }),
                          f.jsx('option', { children: 'Waitlist Open' }),
                          f.jsx('option', { children: 'Closed' }),
                        ],
                      }),
                      f.jsx('textarea', {
                        placeholder:
                          'Describe this upcoming breeding, expected colors, structure, temperament, or waitlist details.',
                        value: oe.description,
                        onChange: (w) =>
                          ve({ ...oe, description: w.target.value }),
                        required: !0,
                      }),
                      f.jsxs('div', {
                        className: 'admin-check-row',
                        children: [
                          f.jsxs('label', {
                            children: [
                              f.jsx('input', {
                                type: 'checkbox',
                                checked: oe.active,
                                onChange: (w) =>
                                  ve({ ...oe, active: w.target.checked }),
                              }),
                              'Active',
                            ],
                          }),
                          f.jsxs('label', {
                            children: [
                              f.jsx('input', {
                                type: 'checkbox',
                                checked: oe.featured,
                                onChange: (w) =>
                                  ve({ ...oe, featured: w.target.checked }),
                              }),
                              'Featured',
                            ],
                          }),
                        ],
                      }),
                      f.jsx('button', {
                        type: 'submit',
                        children: 'Add Upcoming Breeding',
                      }),
                    ],
                  }),
                  M.length === 0
                    ? f.jsxs('div', {
                        className: 'empty-box',
                        children: [
                          f.jsx('h3', {
                            children: 'No upcoming breedings yet',
                          }),
                          f.jsx('p', {
                            children:
                              'Upcoming breeding posts will appear here.',
                          }),
                        ],
                      })
                    : M.map((w) =>
                        f.jsxs(
                          'article',
                          {
                            className: 'admin-card edit-card',
                            children: [
                              w.image_url &&
                                f.jsx('img', {
                                  className: 'admin-preview-img',
                                  src: w.image_url,
                                  alt: w.title,
                                }),
                              f.jsx('label', {
                                className: 'admin-file-label',
                                children: 'Change Main Breeding Image',
                              }),
                              f.jsx('input', {
                                type: 'file',
                                accept: 'image/*',
                                onChange: (C) => Aa(w.id, C.target.files[0]),
                              }),
                              f.jsxs('div', {
                                className: 'admin-gallery-section',
                                children: [
                                  f.jsx('h4', {
                                    children: 'Sire and Dam Pictures',
                                  }),
                                  f.jsxs('div', {
                                    className: 'admin-gallery-grid',
                                    children: [
                                      f.jsxs('div', {
                                        className: 'admin-gallery-item',
                                        children: [
                                          w.sire_image_url &&
                                            f.jsx('img', {
                                              src: w.sire_image_url,
                                              alt: w.sire || 'Sire',
                                            }),
                                          f.jsx('label', {
                                            className: 'admin-file-label',
                                            children: 'Change Sire Picture',
                                          }),
                                          f.jsx('input', {
                                            type: 'file',
                                            accept: 'image/*',
                                            onChange: (C) =>
                                              Ra(w.id, C.target.files[0]),
                                          }),
                                        ],
                                      }),
                                      f.jsxs('div', {
                                        className: 'admin-gallery-item',
                                        children: [
                                          w.dam_image_url &&
                                            f.jsx('img', {
                                              src: w.dam_image_url,
                                              alt: w.dam || 'Dam',
                                            }),
                                          f.jsx('label', {
                                            className: 'admin-file-label',
                                            children: 'Change Dam Picture',
                                          }),
                                          f.jsx('input', {
                                            type: 'file',
                                            accept: 'image/*',
                                            onChange: (C) =>
                                              Tn(w.id, C.target.files[0]),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              f.jsx('input', {
                                value: w.title || '',
                                onChange: (C) =>
                                  ut(w.id, 'title', C.target.value),
                              }),
                              f.jsx('input', {
                                value: w.sire || '',
                                placeholder: 'Sire / Male',
                                onChange: (C) =>
                                  ut(w.id, 'sire', C.target.value),
                              }),
                              f.jsx('input', {
                                value: w.dam || '',
                                placeholder: 'Dam / Female',
                                onChange: (C) =>
                                  ut(w.id, 'dam', C.target.value),
                              }),
                              f.jsx('input', {
                                value: w.expected_date || '',
                                placeholder: 'Expected date',
                                onChange: (C) =>
                                  ut(w.id, 'expected_date', C.target.value),
                              }),
                              f.jsxs('select', {
                                value: w.status || 'Upcoming',
                                onChange: (C) =>
                                  ut(w.id, 'status', C.target.value),
                                children: [
                                  f.jsx('option', { children: 'Upcoming' }),
                                  f.jsx('option', { children: 'Confirmed' }),
                                  f.jsx('option', {
                                    children: 'Pregnancy Confirmed',
                                  }),
                                  f.jsx('option', { children: 'Born' }),
                                  f.jsx('option', {
                                    children: 'Waitlist Open',
                                  }),
                                  f.jsx('option', { children: 'Closed' }),
                                ],
                              }),
                              f.jsx('textarea', {
                                value: w.description || '',
                                onChange: (C) =>
                                  ut(w.id, 'description', C.target.value),
                              }),
                              f.jsxs('div', {
                                className: 'admin-check-row',
                                children: [
                                  f.jsxs('label', {
                                    children: [
                                      f.jsx('input', {
                                        type: 'checkbox',
                                        checked: !!w.active,
                                        onChange: (C) =>
                                          ut(w.id, 'active', C.target.checked),
                                      }),
                                      'Active',
                                    ],
                                  }),
                                  f.jsxs('label', {
                                    children: [
                                      f.jsx('input', {
                                        type: 'checkbox',
                                        checked: !!w.featured,
                                        onChange: (C) =>
                                          ut(
                                            w.id,
                                            'featured',
                                            C.target.checked,
                                          ),
                                      }),
                                      'Featured',
                                    ],
                                  }),
                                ],
                              }),
                              f.jsx('button', {
                                className: 'danger',
                                onClick: () => ni(w.id),
                                children: 'Delete Upcoming Breeding',
                              }),
                            ],
                          },
                          w.id,
                        ),
                      ),
                ],
              }),
            o === 'deposits' &&
              f.jsxs('section', {
                className: 'admin-panel',
                children: [
                  f.jsx('h2', { children: 'Deposit Requests' }),
                  q.length === 0
                    ? f.jsxs('div', {
                        className: 'empty-box',
                        children: [
                          f.jsx('h3', { children: 'No deposit requests yet' }),
                          f.jsx('p', {
                            children:
                              'Buyer deposit requests will appear here.',
                          }),
                        ],
                      })
                    : q.map((w) =>
                        f.jsxs(
                          'article',
                          {
                            className: 'admin-card',
                            children: [
                              f.jsxs('div', {
                                className: 'card-top',
                                children: [
                                  f.jsxs('div', {
                                    children: [
                                      f.jsx('h3', { children: w.name }),
                                      f.jsx('p', { children: w.email }),
                                      f.jsx('p', { children: w.phone }),
                                      f.jsx('small', {
                                        children: new Date(
                                          w.created_at,
                                        ).toLocaleString(),
                                      }),
                                    ],
                                  }),
                                  f.jsx('span', {
                                    className: 'status-pill',
                                    children: w.status,
                                  }),
                                ],
                              }),
                              f.jsxs('div', {
                                className: 'message-box',
                                children: [
                                  f.jsxs('p', {
                                    children: [
                                      f.jsx('strong', {
                                        children: 'Interested In:',
                                      }),
                                      ' ',
                                      w.interested_in,
                                    ],
                                  }),
                                  f.jsxs('p', {
                                    children: [
                                      f.jsx('strong', {
                                        children: 'Interest Type:',
                                      }),
                                      ' ',
                                      w.interest_type,
                                    ],
                                  }),
                                  f.jsxs('p', {
                                    children: [
                                      f.jsx('strong', {
                                        children: 'Deposit Type:',
                                      }),
                                      ' ',
                                      w.deposit_type,
                                    ],
                                  }),
                                  f.jsx('p', {
                                    children: f.jsx('strong', {
                                      children: 'Message:',
                                    }),
                                  }),
                                  f.jsx('p', { children: w.message }),
                                ],
                              }),
                              f.jsxs('div', {
                                className: 'action-row',
                                children: [
                                  f.jsx('a', {
                                    className: 'email-customer-button',
                                    href: ln(
                                      w.email,
                                      'Seibab Kennel Deposit Request Follow-Up',
                                      Rn(w),
                                    ),
                                    children: 'Email Customer',
                                  }),
                                  f.jsx('button', {
                                    onClick: () => rn(w.id, 'New'),
                                    children: 'Mark New',
                                  }),
                                  f.jsx('button', {
                                    onClick: () => rn(w.id, 'Contacted'),
                                    children: 'Contacted',
                                  }),
                                  f.jsx('button', {
                                    onClick: () => rn(w.id, 'Pending Payment'),
                                    children: 'Pending Payment',
                                  }),
                                  f.jsx('button', {
                                    onClick: () => rn(w.id, 'Deposit Received'),
                                    children: 'Deposit Received',
                                  }),
                                  f.jsx('button', {
                                    onClick: () => rn(w.id, 'Closed'),
                                    children: 'Closed',
                                  }),
                                  f.jsx('button', {
                                    className: 'danger',
                                    onClick: () => An(w.id),
                                    children: 'Delete',
                                  }),
                                ],
                              }),
                            ],
                          },
                          w.id,
                        ),
                      ),
                ],
              }),
            o === 'reviews' &&
              f.jsxs('section', {
                className: 'admin-panel',
                children: [
                  f.jsx('h2', { children: 'Customer Reviews' }),
                  S.length === 0
                    ? f.jsxs('div', {
                        className: 'empty-box',
                        children: [
                          f.jsx('h3', { children: 'No reviews yet' }),
                          f.jsx('p', {
                            children:
                              'Customer reviews and feedback will appear here.',
                          }),
                        ],
                      })
                    : S.map((w) =>
                        f.jsxs(
                          'article',
                          {
                            className: 'admin-card',
                            children: [
                              f.jsxs('div', {
                                className: 'card-top',
                                children: [
                                  f.jsxs('div', {
                                    children: [
                                      f.jsx('h3', { children: w.name }),
                                      f.jsx('p', { children: w.email }),
                                      f.jsx('small', {
                                        children: new Date(
                                          w.created_at,
                                        ).toLocaleString(),
                                      }),
                                    ],
                                  }),
                                  f.jsxs('span', {
                                    className: 'status-pill',
                                    children: [
                                      w.rating,
                                      ' Star',
                                      w.rating > 1 ? 's' : '',
                                    ],
                                  }),
                                ],
                              }),
                              w.image_url &&
                                f.jsx('img', {
                                  className: 'admin-preview-img',
                                  src: w.image_url,
                                  alt: w.name,
                                }),
                              f.jsx('div', {
                                className: 'message-box',
                                children: w.review,
                              }),
                              f.jsxs('p', {
                                children: [
                                  f.jsx('strong', { children: 'Status:' }),
                                  ' ',
                                  w.approved
                                    ? 'Featured on website'
                                    : 'Admin only',
                                ],
                              }),
                              f.jsxs('div', {
                                className: 'action-row',
                                children: [
                                  f.jsx('a', {
                                    className: 'email-customer-button',
                                    href: ln(
                                      w.email,
                                      'Thank You From Seibab Kennel',
                                      ii(w),
                                    ),
                                    children: 'Email Customer',
                                  }),
                                  w.rating === 5 &&
                                    f.jsxs(f.Fragment, {
                                      children: [
                                        f.jsx('button', {
                                          onClick: () => _e(w.id, !0),
                                          children: 'Feature Review',
                                        }),
                                        f.jsx('button', {
                                          onClick: () => _e(w.id, !1),
                                          children: 'Hide Review',
                                        }),
                                      ],
                                    }),
                                  f.jsx('button', {
                                    className: 'danger',
                                    onClick: () => de(w.id),
                                    children: 'Delete Review',
                                  }),
                                ],
                              }),
                            ],
                          },
                          w.id,
                        ),
                      ),
                ],
              }),
            o === 'puppies' &&
              f.jsxs('section', {
                className: 'admin-panel',
                children: [
                  f.jsx('h2', { children: 'Manage Puppies' }),
                  f.jsxs('form', {
                    className: 'admin-form',
                    onSubmit: Rt,
                    children: [
                      f.jsx('input', {
                        placeholder: 'Puppy name',
                        value: I.name,
                        onChange: (w) => J({ ...I, name: w.target.value }),
                        required: !0,
                      }),
                      f.jsx('label', {
                        className: 'admin-file-label',
                        children: 'Main Puppy Image',
                      }),
                      f.jsx('input', {
                        type: 'file',
                        accept: 'image/*',
                        onChange: (w) =>
                          J({ ...I, imageFile: w.target.files[0] }),
                        required: !0,
                      }),
                      f.jsx('label', {
                        className: 'admin-file-label',
                        children:
                          'Extra Gallery Images: hold Command ⌘ and click multiple photos',
                      }),
                      f.jsx('input', {
                        type: 'file',
                        accept: 'image/*',
                        multiple: !0,
                        onChange: (w) =>
                          J({ ...I, galleryFiles: Array.from(w.target.files) }),
                      }),
                      f.jsx('label', {
                        className: 'admin-file-label',
                        children: 'Pedigree PDF',
                      }),
                      f.jsx('input', {
                        type: 'file',
                        accept: 'application/pdf',
                        onChange: (w) =>
                          J({ ...I, pedigreeFile: w.target.files[0] }),
                      }),
                      f.jsx('input', {
                        placeholder: 'Gender',
                        value: I.gender,
                        onChange: (w) => J({ ...I, gender: w.target.value }),
                        required: !0,
                      }),
                      f.jsx('input', {
                        placeholder: 'Price',
                        value: I.price,
                        onChange: (w) => J({ ...I, price: w.target.value }),
                        required: !0,
                      }),
                      f.jsxs('select', {
                        value: I.status,
                        onChange: (w) => J({ ...I, status: w.target.value }),
                        children: [
                          f.jsx('option', { children: 'Available' }),
                          f.jsx('option', { children: 'Reserved' }),
                          f.jsx('option', { children: 'Sold' }),
                        ],
                      }),
                      f.jsx('textarea', {
                        placeholder: 'Description',
                        value: I.description,
                        onChange: (w) =>
                          J({ ...I, description: w.target.value }),
                        required: !0,
                      }),
                      f.jsxs('div', {
                        className: 'admin-check-row',
                        children: [
                          f.jsxs('label', {
                            children: [
                              f.jsx('input', {
                                type: 'checkbox',
                                checked: I.featured,
                                onChange: (w) =>
                                  J({ ...I, featured: w.target.checked }),
                              }),
                              'Featured Puppy',
                            ],
                          }),
                          f.jsxs('label', {
                            children: [
                              f.jsx('input', {
                                type: 'checkbox',
                                checked: I.sold,
                                onChange: (w) =>
                                  J({ ...I, sold: w.target.checked }),
                              }),
                              'Sold Puppy',
                            ],
                          }),
                        ],
                      }),
                      f.jsx('button', {
                        type: 'submit',
                        children: 'Add Puppy',
                      }),
                    ],
                  }),
                  m.map((w) =>
                    f.jsxs(
                      'article',
                      {
                        className: 'admin-card edit-card',
                        children: [
                          w.image_url &&
                            f.jsx('img', {
                              className: 'admin-preview-img',
                              src: w.image_url,
                              alt: w.name,
                            }),
                          f.jsx('label', {
                            className: 'admin-file-label',
                            children: 'Change Main Image',
                          }),
                          f.jsx('input', {
                            type: 'file',
                            accept: 'image/*',
                            onChange: (C) => Oa(w.id, C.target.files[0]),
                          }),
                          f.jsx('input', {
                            value: w.name || '',
                            onChange: (C) => _t(w.id, 'name', C.target.value),
                          }),
                          f.jsx('input', {
                            value: w.gender || '',
                            onChange: (C) => _t(w.id, 'gender', C.target.value),
                          }),
                          f.jsx('input', {
                            value: w.price || '',
                            onChange: (C) => _t(w.id, 'price', C.target.value),
                          }),
                          f.jsxs('select', {
                            value: w.status || 'Available',
                            onChange: (C) => _t(w.id, 'status', C.target.value),
                            children: [
                              f.jsx('option', { children: 'Available' }),
                              f.jsx('option', { children: 'Reserved' }),
                              f.jsx('option', { children: 'Sold' }),
                            ],
                          }),
                          f.jsx('textarea', {
                            value: w.description || '',
                            onChange: (C) =>
                              _t(w.id, 'description', C.target.value),
                          }),
                          f.jsxs('div', {
                            className: 'admin-check-row',
                            children: [
                              f.jsxs('label', {
                                children: [
                                  f.jsx('input', {
                                    type: 'checkbox',
                                    checked: !!w.featured,
                                    onChange: (C) =>
                                      _t(w.id, 'featured', C.target.checked),
                                  }),
                                  'Featured',
                                ],
                              }),
                              f.jsxs('label', {
                                children: [
                                  f.jsx('input', {
                                    type: 'checkbox',
                                    checked: !!w.sold,
                                    onChange: (C) =>
                                      _t(w.id, 'sold', C.target.checked),
                                  }),
                                  'Sold',
                                ],
                              }),
                            ],
                          }),
                          f.jsxs('div', {
                            className: 'admin-gallery-section',
                            children: [
                              f.jsxs('div', {
                                className: 'admin-section-top',
                                children: [
                                  f.jsx('h4', { children: 'Gallery Images' }),
                                  f.jsx('button', {
                                    type: 'button',
                                    onClick: () => ai(w),
                                    children: 'Add Gallery Images',
                                  }),
                                ],
                              }),
                              f.jsx('div', {
                                className: 'admin-gallery-grid',
                                children: (w.gallery_urls || []).map((C) =>
                                  f.jsxs(
                                    'div',
                                    {
                                      className: 'admin-gallery-item',
                                      children: [
                                        f.jsx('img', {
                                          src: C,
                                          alt: 'Puppy gallery',
                                        }),
                                        f.jsx('button', {
                                          type: 'button',
                                          className: 'danger',
                                          onClick: () => F(w, C),
                                          children: 'Remove',
                                        }),
                                      ],
                                    },
                                    C,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          f.jsxs('div', {
                            className: 'admin-pedigree-row',
                            children: [
                              f.jsx('h4', { children: 'Pedigree PDF' }),
                              w.pedigree_url
                                ? f.jsx('a', {
                                    href: w.pedigree_url,
                                    target: '_blank',
                                    rel: 'noreferrer',
                                    children: 'View Current Pedigree',
                                  })
                                : f.jsx('p', {
                                    children: 'No pedigree uploaded',
                                  }),
                              f.jsx('input', {
                                type: 'file',
                                accept: 'application/pdf',
                                onChange: (C) => Le(w.id, C.target.files[0]),
                              }),
                            ],
                          }),
                          f.jsx('button', {
                            className: 'danger',
                            onClick: () => et(w.id),
                            children: 'Delete Puppy',
                          }),
                        ],
                      },
                      w.id,
                    ),
                  ),
                ],
              }),
            o === 'studs' &&
              f.jsxs('section', {
                className: 'admin-panel',
                children: [
                  f.jsx('h2', { children: 'Manage Studs' }),
                  f.jsxs('form', {
                    className: 'admin-form',
                    onSubmit: Ot,
                    children: [
                      f.jsx('input', {
                        placeholder: 'Stud name',
                        value: Y.name,
                        onChange: (w) => W({ ...Y, name: w.target.value }),
                        required: !0,
                      }),
                      f.jsx('label', {
                        className: 'admin-file-label',
                        children: 'Main Stud Image',
                      }),
                      f.jsx('input', {
                        type: 'file',
                        accept: 'image/*',
                        onChange: (w) =>
                          W({ ...Y, imageFile: w.target.files[0] }),
                        required: !0,
                      }),
                      f.jsx('label', {
                        className: 'admin-file-label',
                        children: 'Extra Gallery Images',
                      }),
                      f.jsx('input', {
                        type: 'file',
                        accept: 'image/*',
                        multiple: !0,
                        onChange: (w) =>
                          W({ ...Y, galleryFiles: Array.from(w.target.files) }),
                      }),
                      f.jsx('label', {
                        className: 'admin-file-label',
                        children: 'Pedigree PDF',
                      }),
                      f.jsx('input', {
                        type: 'file',
                        accept: 'application/pdf',
                        onChange: (w) =>
                          W({ ...Y, pedigreeFile: w.target.files[0] }),
                      }),
                      f.jsx('input', {
                        placeholder: 'Stud fee',
                        value: Y.fee,
                        onChange: (w) => W({ ...Y, fee: w.target.value }),
                        required: !0,
                      }),
                      f.jsx('input', {
                        placeholder: 'Bloodline',
                        value: Y.bloodline,
                        onChange: (w) => W({ ...Y, bloodline: w.target.value }),
                        required: !0,
                      }),
                      f.jsxs('select', {
                        value: Y.status,
                        onChange: (w) => W({ ...Y, status: w.target.value }),
                        children: [
                          f.jsx('option', { children: 'Available' }),
                          f.jsx('option', { children: 'Limited Availability' }),
                          f.jsx('option', { children: 'Unavailable' }),
                        ],
                      }),
                      f.jsx('textarea', {
                        placeholder: 'Description',
                        value: Y.description,
                        onChange: (w) =>
                          W({ ...Y, description: w.target.value }),
                        required: !0,
                      }),
                      f.jsx('div', {
                        className: 'admin-check-row',
                        children: f.jsxs('label', {
                          children: [
                            f.jsx('input', {
                              type: 'checkbox',
                              checked: Y.featured,
                              onChange: (w) =>
                                W({ ...Y, featured: w.target.checked }),
                            }),
                            'Featured Stud',
                          ],
                        }),
                      }),
                      f.jsx('button', { type: 'submit', children: 'Add Stud' }),
                    ],
                  }),
                  y.map((w) =>
                    f.jsxs(
                      'article',
                      {
                        className: 'admin-card edit-card',
                        children: [
                          w.image_url &&
                            f.jsx('img', {
                              className: 'admin-preview-img',
                              src: w.image_url,
                              alt: w.name,
                            }),
                          f.jsx('label', {
                            className: 'admin-file-label',
                            children: 'Change Main Image',
                          }),
                          f.jsx('input', {
                            type: 'file',
                            accept: 'image/*',
                            onChange: (C) => Pt(w.id, C.target.files[0]),
                          }),
                          f.jsx('input', {
                            value: w.name || '',
                            onChange: (C) => $e(w.id, 'name', C.target.value),
                          }),
                          f.jsx('input', {
                            value: w.fee || '',
                            onChange: (C) => $e(w.id, 'fee', C.target.value),
                          }),
                          f.jsx('input', {
                            value: w.bloodline || '',
                            onChange: (C) =>
                              $e(w.id, 'bloodline', C.target.value),
                          }),
                          f.jsxs('select', {
                            value: w.status || 'Available',
                            onChange: (C) => $e(w.id, 'status', C.target.value),
                            children: [
                              f.jsx('option', { children: 'Available' }),
                              f.jsx('option', {
                                children: 'Limited Availability',
                              }),
                              f.jsx('option', { children: 'Unavailable' }),
                            ],
                          }),
                          f.jsx('textarea', {
                            value: w.description || '',
                            onChange: (C) =>
                              $e(w.id, 'description', C.target.value),
                          }),
                          f.jsx('div', {
                            className: 'admin-check-row',
                            children: f.jsxs('label', {
                              children: [
                                f.jsx('input', {
                                  type: 'checkbox',
                                  checked: !!w.featured,
                                  onChange: (C) =>
                                    $e(w.id, 'featured', C.target.checked),
                                }),
                                'Featured',
                              ],
                            }),
                          }),
                          f.jsxs('div', {
                            className: 'admin-gallery-section',
                            children: [
                              f.jsxs('div', {
                                className: 'admin-section-top',
                                children: [
                                  f.jsx('h4', { children: 'Gallery Images' }),
                                  f.jsx('button', {
                                    type: 'button',
                                    onClick: () => tt(w),
                                    children: 'Add Gallery Images',
                                  }),
                                ],
                              }),
                              f.jsx('div', {
                                className: 'admin-gallery-grid',
                                children: (w.gallery_urls || []).map((C) =>
                                  f.jsxs(
                                    'div',
                                    {
                                      className: 'admin-gallery-item',
                                      children: [
                                        f.jsx('img', {
                                          src: C,
                                          alt: 'Stud gallery',
                                        }),
                                        f.jsx('button', {
                                          type: 'button',
                                          className: 'danger',
                                          onClick: () => Tt(w, C),
                                          children: 'Remove',
                                        }),
                                      ],
                                    },
                                    C,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          f.jsxs('div', {
                            className: 'admin-pedigree-row',
                            children: [
                              f.jsx('h4', { children: 'Pedigree PDF' }),
                              w.pedigree_url
                                ? f.jsx('a', {
                                    href: w.pedigree_url,
                                    target: '_blank',
                                    rel: 'noreferrer',
                                    children: 'View Current Pedigree',
                                  })
                                : f.jsx('p', {
                                    children: 'No pedigree uploaded',
                                  }),
                              f.jsx('input', {
                                type: 'file',
                                accept: 'application/pdf',
                                onChange: (C) => rt(w.id, C.target.files[0]),
                              }),
                            ],
                          }),
                          f.jsx('button', {
                            className: 'danger',
                            onClick: () => Nt(w.id),
                            children: 'Delete Stud',
                          }),
                        ],
                      },
                      w.id,
                    ),
                  ),
                ],
              }),
          ],
        })
      : null;
  },
  QE = () =>
    f.jsxs('footer', {
      className: 'footer',
      children: [
        f.jsxs('div', {
          className: 'footer-inner',
          children: [
            f.jsxs('div', {
              children: [
                f.jsx('h2', { children: 'Seibab Kennel' }),
                f.jsx('p', {
                  children:
                    'Extreme / XL American Bullies raised with quality and care.',
                }),
              ],
            }),
            f.jsxs('nav', {
              className: 'footer-nav',
              children: [
                f.jsx(bt, {
                  to: '/',
                  className: 'footer-link',
                  children: 'Home',
                }),
                f.jsx(bt, {
                  to: '/available-puppies',
                  className: 'footer-link',
                  children: 'Available Puppies',
                }),
                f.jsx(bt, {
                  to: '/studs',
                  className: 'footer-link',
                  children: 'Studs',
                }),
                f.jsx(bt, {
                  to: '/about',
                  className: 'footer-link',
                  children: 'About',
                }),
                f.jsx(bt, {
                  to: '/contact',
                  className: 'footer-link',
                  children: 'Contact',
                }),
              ],
            }),
          ],
        }),
        f.jsxs('div', {
          className: 'footer-bottom',
          children: [
            f.jsx('p', { children: 'Seibab Kennel Inc. © 2023' }),
            f.jsx('p', {
              children: 'Phone: (972) 330-3392 | Email: seibabkennels@gmail.com',
            }),
          ],
        }),
      ],
    });
function WE() {
  const [a, n] = x.useState([]);
  x.useEffect(() => {
    s();
  }, []);
  const s = async () => {
    const { data: r, error: o } = await ye
      .from('WhatsNew')
      .select('*')
      .eq('active', !0)
      .order('featured', { ascending: !1 })
      .order('created_at', { ascending: !1 });
    o || n(r || []);
  };
  return f.jsxs('main', {
    className: 'whats-new-page',
    children: [
      f.jsxs('section', {
        className: 'whats-new-hero',
        children: [
          f.jsx('p', { className: 'eyebrow', children: 'What’s New' }),
          f.jsx('h1', { children: 'Latest Updates From Seibab Kennel' }),
          f.jsx('p', {
            children:
              'Stay updated on new puppies, studs, breed announcements, upcoming litters, and important kennel news.',
          }),
        ],
      }),
      a.length === 0
        ? f.jsxs('section', {
            className: 'whats-new-empty',
            children: [
              f.jsx('h2', { children: 'No updates posted yet' }),
              f.jsx('p', {
                children: 'Check back soon for new kennel announcements.',
              }),
            ],
          })
        : f.jsx('section', {
            className: 'whats-new-grid',
            children: a.map((r) =>
              f.jsxs(
                'article',
                {
                  className: 'whats-new-card',
                  children: [
                    r.image_url &&
                      f.jsxs('div', {
                        className: 'whats-new-image',
                        children: [
                          f.jsx('img', { src: r.image_url, alt: r.title }),
                          r.featured && f.jsx('span', { children: 'Featured' }),
                        ],
                      }),
                    f.jsxs('div', {
                      className: 'whats-new-content',
                      children: [
                        f.jsx('span', {
                          className: 'whats-new-tag',
                          children: r.tag,
                        }),
                        f.jsx('h2', { children: r.title }),
                        f.jsx('p', { children: r.description }),
                        f.jsx(bt, {
                          to: r.redirect_path || '/whats-new',
                          className: 'whats-new-button',
                          children: r.button_text || 'Learn More',
                        }),
                      ],
                    }),
                  ],
                },
                r.id,
              ),
            ),
          }),
    ],
  });
}
function ZE() {
  return f.jsxs('main', {
    className: 'reviews-page',
    children: [
      f.jsxs('section', {
        className: 'reviews-page-hero',
        children: [
          f.jsx('p', { className: 'eyebrow', children: 'Customer Reviews' }),
          f.jsx('h1', { children: 'What Families Are Saying' }),
          f.jsx('p', {
            children:
              'Read featured 5-star reviews from Seibab Kennel families and leave feedback about your experience.',
          }),
        ],
      }),
      f.jsx(Sd, {}),
    ],
  });
}
const FE = () =>
  f.jsxs('div', {
    className: 'app',
    children: [
      f.jsx(h_, {}),
      f.jsxs(Z0, {
        children: [
          f.jsx(wn, { path: '/', element: f.jsx(zE, {}) }),
          f.jsx(wn, { path: '/whats-new', element: f.jsx(WE, {}) }),
          f.jsx(wn, { path: '/available-puppies', element: f.jsx(qE, {}) }),
          f.jsx(wn, { path: '/puppy-info', element: f.jsx(HE, {}) }),
          f.jsx(wn, { path: '/studs', element: f.jsx($E, {}) }),
          f.jsx(wn, { path: '/reviews', element: f.jsx(ZE, {}) }),
          f.jsx(wn, { path: '/about', element: f.jsx(IE, {}) }),
          f.jsx(wn, { path: '/contact', element: f.jsx(KE, {}) }),
          f.jsx(wn, { path: '/admin', element: f.jsx(JE, {}) }),
        ],
      }),
      f.jsx(QE, {}),
    ],
  });
export default FE;
