import { useNavigate, useLocation } from 'react-router-dom'

/**
 * A link that navigates to `to` and then scrolls to the element with id `hash`.
 *
 * Why we need this on GitHub Pages:
 *   - Plain `<a href="#features">` works on the homepage, but if the user is
 *     on `/privacy` it would try to scroll on the privacy page (no such
 *     element) instead of going back to home and scrolling.
 *   - `<Link to="/#features">` navigates the React Router route but the
 *     browser-side hash for in-page scroll needs an explicit `replaceState`
 *     because the React Router location model and the URL's `#fragment` are
 *     separate things.
 *
 * The basename is read from the same Vite-injected value that
 * `<BrowserRouter>` uses so the two can never disagree.
 */
export default function HashLink({
  to = '/',
  hash,
  children,
  className,
  onClick,
  ...rest
}) {
  const navigate = useNavigate()
  const location = useLocation()

  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '/')
  const href = `${base}#${hash}`

  const handleClick = (e) => {
    e.preventDefault()
    onClick?.(e)

    const scroll = () => {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Keep the URL in sync so refresh / share works.
        window.history.replaceState(null, '', `#${hash}`)
      }
    }

    if (location.pathname === to) {
      scroll()
    } else {
      navigate(to)
      // Wait for the new route to mount before measuring the anchor.
      setTimeout(scroll, 60)
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  )
}
